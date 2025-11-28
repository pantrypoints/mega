import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

// --- GLOBAL STATE FOR SSE --- 
let controllers: ReadableStreamDefaultController[] = []; 

function broadcast(data: any) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    
    // FIX: Safely enqueue data and filter out closed controllers.
    const activeControllers: ReadableStreamDefaultController[] = [];

    controllers.forEach((c) => {
        try {
            c.enqueue(payload);
            activeControllers.push(c); // Keep the controller if enqueuing succeeded
        } catch (e) {
            // If enqueue fails (due to ERR_INVALID_STATE), the controller is closed.
            // We ignore the error and discard this controller by not adding it back.
            console.warn("Discarding closed SSE controller.");
        }
    });
    
    // Update the global list with only the active controllers
    controllers = activeControllers;
} 

// --- SSE CONNECTION --- 
export const GET: RequestHandler = () => {
    const stream = new ReadableStream({
        start(controller) {
            controllers.push(controller);
        }, 
        cancel(controller) {
            // Explicit cleanup when the client closes the connection
            controllers = controllers.filter((c) => c !== controller);
        }
    }); 

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream', 
            'Cache-Control': 'no-cache', 
            Connection: 'keep-alive' 
        } 
    }); 
}; 

// --- CREATE POST --- 
export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user?.id) {
        return json({ message: 'Unauthorized' }, { status: 401 });
    } 

    const { content } = await request.json(); 

    if (!content?.trim()) {
        return json({ message: 'Content is required' }, { status: 400 });
    } 

    // Insert new post 
    const result = await db
        .insert(posts)
        .values({
            content: content.trim(), 
            userId: locals.user.id 
        })
        .returning(); 

    // Include username + avatar 
    const [profile] = await db
        .select({
            username: user.username, 
            avatar: user.avatar 
        })
        .from(user)
        .where(eq(user.id, locals.user.id));

    const payload = {
        id: result[0].id, 
        content: content.trim(), 
        username: profile.username, 
        avatar: profile.avatar, 
        dateCreated: result[0].dateCreated 
    }; 

    // Broadcast to all SSE listeners 
    broadcast(payload); 
    
    return json({ success: true }); 
};