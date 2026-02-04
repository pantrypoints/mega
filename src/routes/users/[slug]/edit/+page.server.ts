// gemini fast

import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { getDb } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, platform, locals }) => {
    // 1. Check authentication
    if (!locals.user) throw redirect(302, '/login');

    const db = getDb(platform?.env);
    const [foundUser] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.slug, params.slug))
        .limit(1);

    if (!foundUser) throw error(404, 'User not found');
    
    // 2. Authorization: Ensure user is editing themselves
    if (foundUser.id !== locals.user.id) throw error(403, 'Unauthorized');

    return { profile: foundUser };
};

export const actions: Actions = {
    default: async ({ request, params, platform, locals }) => {
        if (!locals.user) return fail(401);

        const formData = await request.formData();
        const db = getDb(platform?.env);

        // Extract fields
        const updateData = {
            codename: formData.get('codename') as string,
            pin: formData.get('pin') as string,
            avatar: formData.get('avatar') as string,
            gender: formData.get('gender') as string,
            dateOfBirth: formData.get('dateOfBirth') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            city: formData.get('city') as string,
            country: formData.get('country') as string,
            dateModified: new Date().toISOString()
        };

        try {
            await db.update(userTable)
                .set(updateData)
                .where(eq(userTable.id, locals.user.id));
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Failed to update profile' });
        }

        throw redirect(303, `/users/${params.slug}`);
    }
};

