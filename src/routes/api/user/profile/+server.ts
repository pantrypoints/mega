import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';



export const GET: RequestHandler = async ({ locals }) => {
	try {
		// Check if user is authenticated
		const session = locals.session;
		if (!session || !session.userId) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = session.userId;

		// Get user data
		const [userData] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

		if (!userData) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		// Return user profile with personality scores
		return json({
			id: userData.id,
			username: userData.username,
			codename: userData.codename,
			avatar: userData.avatar,
			gender: userData.gender,
			dateOfBirth: userData.dateOfBirth,
			email: userData.email,
			phone: userData.phone,
			city: userData.city,
			country: userData.country,
			// Personality scores
			heart: userData.heart,
			brain: userData.brain,
			body: userData.body,
			luna: userData.luna,
			mercury: userData.mercury,
			saturn: userData.saturn,
			apollo: userData.apollo,
			jupiter: userData.jupiter,
			venus: userData.venus,
			mars: userData.mars,
			dateCreated: userData.dateCreated,
			dateModified: userData.dateModified
		});
	} catch (error) {
		console.error('Error fetching user profile:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
