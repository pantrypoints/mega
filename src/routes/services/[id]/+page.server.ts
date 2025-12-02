import { error } from '@sveltejs/kit';
import { services } from '$lib/server/db/schema'; // Assuming 'services' is the service table
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
    // 1. Get the DB instance from locals and the logged-in user
    const db = locals.db;
    const currentUserId = locals.user?.id || null; // The ID of the currently logged-in user

    // The service ID from the URL is typically text/string
    const serviceId = params.id; 

    if (!serviceId) {
        throw error(404, 'Invalid service ID.');
    }

    try {
        // NOTE: Since your component uses service.id, and your schema defines services.id as text
        // we should query using the string id from params.
        const result = await db
            .select()
            .from(services)
            // Assuming services.id is TEXT, we compare with the string serviceId
            .where(eq(services.id, serviceId)) 
            .limit(1);

        const service = result[0];

        // 4. Handle 404 (service not found)
        if (!service) {
            throw error(404, 'Service not found.');
        }
        
        // 5. Calculate necessary client data
        // Check if the service owner ID matches the logged-in user ID
        const isOwner = currentUserId !== null && currentUserId === service.userId;

        // Mock owner avatar fetch for now
        const ownerAvatar = `https://i.pravatar.cc/150?u=${service.userId}`; 

        // 6. Return the service data and the required owner context
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
            isOwner,
            ownerAvatar,
            currentUserId, // Passed to the component
        };
    } catch (e) {
        console.error("Database query failed:", e);
        throw error(500, 'Could not load service data due to a server error.');
    }
};