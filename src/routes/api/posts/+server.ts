import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const POST = async ({ request, cookies }) => {
    const userId = cookies.get('userId');

    if (!userId) {
        return json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { content } = await request.json();

        if (!content || !content.trim()) {
            return json({ message: 'Content is required' }, { status: 400 });
        }

        await db.insert(posts).values({
            content: content.trim(),
            userId: parseInt(userId)
        });

        return json({ success: true });
    } catch (error) {
        console.error(error);
        return json({ message: 'Failed to create post' }, { status: 500 });
    }
};
