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










// export const POST: RequestHandler = async ({ request, cookies }) => {
//     const userId = cookies.get('userId');
//     if (!userId) {
//         return json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     try {
//         // Safely parse the request body first
//         let requestBody: any;
//         try {
//             requestBody = await request.json();
//         } catch (e) {
//             // Catches JSON parsing errors (e.g., empty or malformed body)
//             return json({ message: 'Invalid JSON body provided' }, { status: 400 });
//         }

//         // FIX: Ensure requestBody is a valid object before destructuring
//         if (!requestBody || typeof requestBody !== 'object') {
//             return json({ message: 'Request body must be a valid object' }, { status: 400 });
//         }
        
//         const { content } = requestBody;
        
//         if (!content || content.trim().length === 0) {
//             return json({ message: 'Content is required' }, { status: 400 });
//         }

//         // The userId from the cookie is a string (Base32 encoded) and must be inserted as a string.
//         await db.insert(posts).values({
//             content: content.trim(), 
//             userId: userId // Inserted as string
//         });

//         return json({ success: true });
//     } catch (error) {
//         console.error('Error creating post:', error);
//         // Provide more detail in development if possible, but keep 500 for production
//         return json({ message: 'Failed to create post. Check server logs for details.' }, { status: 500 });
//     }
// };

