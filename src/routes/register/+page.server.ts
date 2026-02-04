import * as bcrypt from 'bcryptjs';
import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or } from 'drizzle-orm';
import * as auth from '$lib/server/auth';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

const saltRounds = 10;

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	register: async (event) => {
		const db = event.locals.db;
		const form = await event.request.formData();
		
		// Extract form data
		const username = form.get('username');
		const codename = form.get('codename');
		const pin = form.get('pin');
		const pinConfirm = form.get('pinConfirm');
		const password = form.get('password');
		const passwordConfirm = form.get('passwordConfirm');
		const genderInput = form.get('gender') as string | null;
		
		// Validate required fields are not null
		if (!username || !codename || !pin || !pinConfirm || !password || !passwordConfirm) {
			return fail(400, { message: 'All required fields must be provided' });
		}

		// Convert to string for validation
		const usernameStr = username as string;
		const codenameStr = codename as string;
		const pinStr = pin as string;
		const pinConfirmStr = pinConfirm as string;
		const passwordStr = password as string;
		const passwordConfirmStr = passwordConfirm as string;

		// Generate initial slug from username
		const slug = usernameStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

		// ---------- VALIDATION ----------
		if (!validateUsername(usernameStr)) return fail(400, { message: 'Invalid username' });
		if (!validateCodename(codenameStr)) return fail(400, { message: 'Invalid codename' });
		if (!validatePassword(passwordStr)) return fail(400, { message: 'Password too weak' });
		if (!validatePIN(pinStr)) return fail(400, { message: 'Invalid PIN' });
		if (passwordStr !== passwordConfirmStr) return fail(400, { message: 'Passwords do not match' });
		if (pinStr !== pinConfirmStr) return fail(400, { message: 'PIN does not match' });

		// Gender Validation and Normalization
		if (!genderInput || genderInput === 'Select Gender') {
			return fail(400, { message: 'Gender selection is required.' });
		}
		
		let normalizedGender: 'm' | 'f' | null = null;
		const lowerCaseGender = genderInput.toLowerCase();

		if (lowerCaseGender === 'male' || lowerCaseGender === 'm') {
			normalizedGender = 'm';
		} else if (lowerCaseGender === 'female' || lowerCaseGender === 'f') {
			normalizedGender = 'f';
		} else {
			return fail(400, { message: 'Invalid gender selection.' });
		}

		// Check for duplicate username, codename, or slug
		const existingUser = await db
			.select()
			.from(table.user)
			.where(
				or(
					eq(table.user.username, usernameStr),
					eq(table.user.codename, codenameStr),
					eq(table.user.slug, slug)
				)
			);
		
		if (existingUser.length > 0) {
			// Determine which field caused the conflict
			const conflicts = [];
			if (existingUser.some(u => u.username === usernameStr)) conflicts.push('username');
			if (existingUser.some(u => u.codename === codenameStr)) conflicts.push('codename');
			if (existingUser.some(u => u.slug === slug)) conflicts.push('slug');
			
			return fail(400, { 
				message: `The following are already taken: ${conflicts.join(', ')}` 
			});
		}

		try {
			// Hash password and PIN
			const passwordHash = await bcrypt.hash(passwordStr, saltRounds);
			const pinHash = await bcrypt.hash(pinStr, saltRounds);

			// Generate user ID
			const userId = generateUserId();
			
			// Extract optional fields
			const avatar = form.get('avatar') as string | null;
			const dateOfBirth = form.get('dateOfBirth') as string | null;
			const email = form.get('email') as string | null;
			const phone = form.get('phone') as string | null;
			const city = form.get('city') as string | null;
			const country = form.get('country') as string | null;

			// Insert user into database
			await db.insert(table.user).values({
				id: userId,
				username: usernameStr,
				slug,
				codename: codenameStr,
				pin: pinHash,
				passwordHash,
				avatar,
				gender: normalizedGender,
				dateOfBirth,
				email,
				phone,
				city,
				country
			});

			// Create session
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(db, sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			
		} catch (err) {
			console.error('Registration error:', err);
			return fail(500, { message: 'Registration failed. Please try again.' });
		}

		throw redirect(302, '/');
	}
};

// ---------- HELPER FUNCTIONS ----------
function generateUserId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}

function validateUsername(str: string): boolean {
	return /^[a-zA-Z0-9_-]{3,31}$/.test(str);
}

function validateCodename(str: string): boolean {
	return /^[a-zA-Z0-9_-]{3,31}$/.test(str);
}

function validatePassword(str: string): boolean {
	return str.length >= 6 && str.length <= 255;
}

function validatePIN(str: string): boolean {
	return /^[0-9]{4,8}$/.test(str);
}
