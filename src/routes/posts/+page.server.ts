import { db } from '$lib/server/db';
import { posts, user } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq, desc } from 'drizzle-orm';

let controllers: ReadableStreamDefaultController[] = [];


// Broadcast new posts to all connected SSE clients
function broadcast(data: unknown) {
    for (const c of controllers) {
        c.enqueue(`data: ${JSON.stringify(data)}\n\n`);
    }
}

export const load = async () => {
    const allPosts = await db
        .select({
            id: posts.id,
            content: posts.content,
            dateCreated: posts.dateCreated,
            username: user.username,
            avatar: user.avatar
        })
        .from(posts)
        .leftJoin(user, eq(posts.userId, user.id))
        .orderBy(desc(posts.id));

    return { posts: allPosts };
};

