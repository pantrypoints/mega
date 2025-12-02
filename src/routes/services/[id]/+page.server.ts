import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ params, platform }) => {

    const serviceId = params.id; // <-- FIX: Changed from params.serviceId to params.id
    
    // 1. Get the DB instance, handling the SvelteKit/Bun environment split
    const db = getDb(platform?.env);

    // 2. Extract and validate the service ID from the URL parameters
    if (!serviceId || isNaN(parseInt(serviceId))) {
        // This handles cases like /services/abc or /services/
        throw error(404, 'Invalid service ID format.');
    }

    try {
        // 3. Query the database for the specific service
        // We parse to int since the DB ID is an integer
        const result = await db
            .select()
            .from(services)
            .where(eq(services.id, parseInt(serviceId)))
            .limit(1);

        const service = result[0];

        // 4. Handle 404 (service not found)
        if (!service) {
            throw error(404, 'service not found.');
        }

        // 5. Return the service data
        return {
            service: {
                // Ensure photo URLs are an array for easy iteration in the Svelte file
                ...service,
                photos: [
                    service.photo1,
                    service.photo2,
                    service.photo3,
                    service.photo4,
                    service.photo5,
                    service.photo6,
                ].filter(url => url), // Filter out any null/undefined photos
            },
        };
    } catch (e) {
        console.error("Database query failed:", e);
        throw error(500, 'Could not load service data due to a server error.');
    }
};




// import { error } from '@sveltejs/kit';
// import { getDb } from '$lib/server/db';
// import { services } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { PageServerLoad } from './$types';



// export const load: PageServerLoad = async ({ params, platform, locals }) => {
    
//     const serviceId = params.id; // <-- FIX: Changed from params.serviceId to params.id
    
//     // Check if the current user is available (assuming auth setup exposes user via locals)
//     // NOTE: Replace locals.user.id with your actual authenticated user ID access method.
//     const currentUserId = locals.user?.id; // Assuming locals.user exists after authentication

//     // 1. Get the DB instance, handling the SvelteKit/Bun environment split
//     const db = getDb(platform?.env);

//     // 2. Extract and validate the service ID from the URL parameters
//     if (!serviceId || isNaN(parseInt(serviceId))) {
//         // This handles cases like /services/abc or /services/
//         throw error(404, 'Invalid service ID format.');
//     }


//     try {
//         // 1. Query the database for the specific service, joining with user to get owner data
//         const result = await db
//             .select({
//                 service: services,
//                 ownerAvatar: user.avatar,
//             })
//             .from(services)
//             .where(eq(services.id, parseInt(serviceId)))
//             .leftJoin(user, eq(services.userId, user.id))
//             .limit(1);

//         const serviceWithOwner = result[0];

//         if (!serviceWithOwner || !serviceWithOwner.service) {
//             throw error(404, 'service not found.');
//         }

//         const service = serviceWithOwner.service;

//         // 2. Check ownership and return data
//         const isOwner = currentUserId === service.userId;

//         // 3. Return the service data, ownership status, and owner's avatar
//         return {
//             service: {
//                 ...service,
//                 photos: [
//                     service.photo1,
//                     service.photo2,
//                     service.photo3,
//                     service.photo4,
//                     service.photo5,
//                     service.photo6,
//                 ].filter(url => url),
//             },
//             isOwner,
//             ownerAvatar: serviceWithOwner.ownerAvatar,
//             currentUserId,
//         };
//     } catch (e) {
//         console.error("Database query failed:", e);
//         throw error(500, 'Could not load service data due to a server error.');
//     }

// };

