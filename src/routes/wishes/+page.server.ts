import { getDb } from '$lib/server/db';
import { wishes } from '$lib/server/db/schema';
import { getResourceList } from '$lib/server/list';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (event) => {

    // Uses the DRY helper to handle search, sort, and table selection
    const data = await getResourceList({ 
        db: getDb(event.platform?.env), 
        table: wishes, 
        url: event.url 
    });

    return { ...data };
};



// export const load: PageServerLoad = async ({ locals, platform, url }) => {
//     // Safely get database connection
//     const db = getDb(platform?.env);
    
//     // Get the resource list data
//     const data = await getResourceList({ 
//         db, 
//         table: wishes, 
//         url 
//     });

//     // Check if user exists in locals (populated by hooks)
//     const user = locals.user;

//     // Return merged data
//     return {
//         ...data,
//         user: user ? { ...user, slug: user.slug } : null,
//         unreadMessageCount: 0
//     };
// };


