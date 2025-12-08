import type { LayoutServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { message } from '$lib/server/db/schema';
import { count, eq, and } from 'drizzle-orm';


export const load: LayoutServerLoad = async ({ locals, platform }) => {

    const user = locals.user;
    let unreadMessageCount = 0;

    // Only query for unread messages if the user is logged in
    if (user) {
        try {
            const db = getDb(platform?.env); // ← IMPORTANT
            
            const unreadCountResult = await db
                .select({ count: count(message.id) })
                .from(message)
                // Count messages where the receiver is the current user AND the message is NOT read (false)
                .where(and(
                    eq(message.receiver, user.id),
                    eq(message.isRead, false)
                ));

            unreadMessageCount = unreadCountResult[0]?.count ?? 0;

        } catch (error) {
            console.error("Error fetching unread message count:", error);
            // Fail gracefully if DB connection or query fails
            unreadMessageCount = 0;
        }
    }

    return { 
        user: user,
        unreadMessageCount: unreadMessageCount
    };
};



// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ locals }) => {
    
//     return { user: locals.user };
// };
