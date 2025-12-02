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
		const db = event.locals.db; // ✅ Use db from locals
		const form = await event.request.formData();
		const username = form.get('username');
		const codename = form.get('codename');
		const pin = form.get('pin');
		const pinConfirm = form.get('pinConfirm');
		const password = form.get('password');
		const passwordConfirm = form.get('passwordConfirm');
		const genderInput = form.get('gender') as string | null; // Retrieve gender

		// ---------- VALIDATION ----------
		if (!validateUsername(username)) return fail(400, { message: 'Invalid username' });
		if (!validateCodename(codename)) return fail(400, { message: 'Invalid codename' });
		if (!validatePassword(password)) return fail(400, { message: 'Password too weak' });
		if (!validatePIN(pin)) return fail(400, { message: 'Invalid PIN' });
		if (password !== passwordConfirm) return fail(400, { message: 'Passwords do not match' });
		if (pin !== pinConfirm) return fail(400, { message: 'PIN does not match' });

		// START: Gender Validation and Normalization
		if (!genderInput || genderInput === 'Select Gender') {
			return fail(400, { message: 'Gender selection is required.' });
		}
        
        let normalizedGender: 'm' | 'f' | null = null;
        const lowerCaseGender = genderInput.toLowerCase();

        if (lowerCaseGender === 'male') {
            normalizedGender = 'm';
        } else if (lowerCaseGender === 'female') {
            normalizedGender = 'f';
        } else {
             // Catch invalid/unexpected values
             return fail(400, { message: 'Invalid gender selection.' });
        }
		// END: Gender Validation and Normalization


		// Check duplicate username OR codename (fixed the query)
		const exists = await db
			.select()
			.from(table.user)
			.where(or(eq(table.user.username, username), eq(table.user.codename, codename)));

		if (exists.length) return fail(400, { message: 'User or codename already exists' });

		// ---------- HASH PASSWORD & PIN (USING BCRYPT) ----------
		try {
			const passwordHash = await bcrypt.hash(password as string, saltRounds);
			const pinHash = await bcrypt.hash(pin as string, saltRounds);

			// ---------- INSERT USER ----------
			const userId = generateUserId();
			await db.insert(table.user).values({
				id: userId,
				username,
				codename,
				pin: pinHash,
				passwordHash,
				avatar: form.get('avatar') as string | null, // Use form.get for optional fields
				gender: normalizedGender, // Insert the required and normalized gender value
				dateOfBirth: form.get('dateOfBirth') as string | null, // Use form.get for optional fields
				email: form.get('email') as string | null, // Use form.get for optional fields
				phone: form.get('phone') as string | null, // Use form.get for optional fields
				city: form.get('city') as string | null,
				country: form.get('country') as string | null
			});

			// ✅ Pass db as first parameter
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(db, sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Registration failed' });
		}

		throw redirect(302, '/');
	}
};


// ---------- HELPERS ----------
function generateUserId() {
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	return encodeBase32LowerCase(bytes);
}
function validateUsername(str: unknown): str is string {
	return typeof str === 'string' && /^[a-zA-Z0-9_-]{3,31}$/.test(str);
}
function validateCodename(str: unknown): str is string {
	return typeof str === 'string' && /^[a-zA-Z0-9_-]{3,31}$/.test(str);
}
function validatePassword(str: unknown): str is string {
	return typeof str === 'string' && str.length >= 6 && str.length <= 255;
}
function validatePIN(str: unknown): str is string {
	return typeof str === 'string' && /^[0-9]{4,8}$/.test(str);
}