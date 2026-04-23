import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db'; // Adjust this import based on your database setup
import { users } from '$lib/server/db/schema'; // Adjust based on your schema
import { eq } from 'drizzle-orm'; // Or your ORM's equivalent

export const GET = async ({ url }) => {
    const username = url.searchParams.get('username');
    
    if (!username) {
        return json({ error: 'Username parameter is required' }, { status: 400 });
    }

    try {
        // Check if username exists in database
        const existingUser = await db.select()
            .from(users)
            .where(eq(users.username, username))
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