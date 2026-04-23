import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
    const username = url.searchParams.get('username');
    
    if (!username) {
        return json({ error: 'Username parameter is required' }, { status: 400 });
    }

    // Validate username format (matching your server-side validation)
    if (!/^[a-zA-Z0-9_-]{3,31}$/.test(username)) {
        return json({ 
            available: false,
            error: 'Invalid username format',
            message: 'Username must be 3-31 characters and can only contain letters, numbers, underscores, and hyphens'
        });
    }

    try {
        const db = locals.db;
        
        // Check if username exists
        const existingUser = await db
            .select({ username: table.user.username })
            .from(table.user)
            .where(eq(table.user.username, username))
            .limit(1);

        const isAvailable = existingUser.length === 0;
        
        return json({ 
            available: isAvailable,
            message: isAvailable ? 'Username is available' : 'Username is already taken'
        });
    } catch (error) {
        console.error('Error checking username:', error);
        return json({ error: 'Failed to check username availability' }, { status: 500 });
    }
};

