// from chatgpt fixin error of prevous
import { error, redirect } from '@sveltejs/kit';
import { services } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';


export const load: PageServerLoad = async ({ params, locals }) => {
    const db = locals.db;
    const userId = locals.user?.id;
    const serviceId = params.id;

    if (!userId) throw redirect(302, '/login');

    const [service] = await db
        .select()
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.userId, userId)))
        .limit(1);

    if (!service) throw error(404, 'Service not found');

    return { service };
};

export const actions: Actions = {
    default: async ({ params, request, locals }) => {
        const db = locals.db;
        const userId = locals.user?.id;
        const serviceId = params.id;

        if (!userId) throw redirect(302, '/login');

        const data = await request.formData();

        const name = data.get('name')?.toString() ?? '';
        const headline = data.get('headline')?.toString() ?? '';
        const description = data.get('description')?.toString() ?? '';
        const measure = data.get('measure')?.toString() ?? '';
        const category = data.get('category')?.toString() ?? '';
        const points = parseFloat(data.get('points')?.toString() ?? '0');

        const photoFields = ['photo1','photo2','photo3','photo4','photo5','photo6'];
        const photos: Record<string, string | null> = {};
        for (const f of photoFields) photos[f] = data.get(f)?.toString() || null;

        if (!name || !measure || !category || points <= 0)
            throw error(400, 'Missing required fields');

        await db
            .update(services)
            .set({
                name, headline, description, measure, category, points, dateModified: sql`(CURRENT_TIMESTAMP)`, ...photos
            })
            .where(and(eq(services.id, serviceId), eq(services.userId, userId)));

        throw redirect(303, `/services/${serviceId}`);
    }
};



// import { error, fail, redirect } from '@sveltejs/kit';
// import { services } from '$lib/server/db/schema';
// import { eq, sql } from 'drizzle-orm';
// import type { PageServerLoad, Actions } from './$types';


// export const load: PageServerLoad = async ({ params, locals }) => {
//     const db = locals.db;
//     const currentUserId = locals.user?.id || null;
//     const serviceId = params.id; 

// 	if (!locals.user) {
//         throw redirect(302, '/login');
//     }

// 	if (!serviceId) {
// 		throw error(404, 'Invalid service ID.');
// 	}

// 	try {
// 		const [service] = await db
// 			.select()
// 			.from(services)
// 			.where(eq(services.id, serviceId));

// 		if (!service) {
// 			throw error(404, 'Service not found.');
// 		}
        
//         // Ensure only the owner can access the edit page
//         if (currentUserId !== service.userId) {
//             throw error(403, 'Unauthorized. You do not own this service.');
//         }

// 		return {
// 			service: {
// 				...service,
//                 // Simplify photos back to individual fields for form binding
//                 photo1: service.photo1 || '',
//                 photo2: service.photo2 || '',
//                 photo3: service.photo3 || '',
//                 photo4: service.photo4 || '',
//                 photo5: service.photo5 || '',
//                 photo6: service.photo6 || '',
// 			},
// 		};
// 	} catch (e) {
// 		console.error("Database query failed:", e);
//         // If it's a SvelteKit error/redirect, re-throw it
//         if (e && (e as { status: number }).status) {
//             throw e;
//         }
// 		throw error(500, 'Could not load service data for editing.');
// 	}
// };


// export const actions: Actions = {
//     default: async ({ params, request, locals }) => {
//         if (!locals.user) {
//             throw redirect(302, '/login');
//         }

//         const db = locals.db;
//         const serviceId = params.id;
//         const currentUserId = locals.user.id;
//         const data = await request.formData();

//         // 1. Extract and validate data
//         const name = data.get('name')?.toString();
//         const headline = data.get('headline')?.toString();
//         const description = data.get('description')?.toString();
//         const points = data.get('points')?.toString();
//         const measure = data.get('measure')?.toString();
//         const category = data.get('category')?.toString();
        
//         // Photos are optional
//         const photoFields = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6'];
//         const photos = {};
//         photoFields.forEach(field => {
//             photos[field] = data.get(field)?.toString() || null;
//         });

//         if (!name || !points || !measure || !category) {
//             return fail(400, { success: false, message: 'Missing required fields: Name, Points, Measure, Category.' });
//         }
        
//         const numericPoints = parseFloat(points);
//         if (isNaN(numericPoints) || numericPoints <= 0) {
//             return fail(400, { success: false, message: 'Points value must be a positive number.' });
//         }

//         try {
//             // 2. Perform the update, ensuring the user is the owner
//             const updateResult = await db
//                 .update(services)
//                 .set({
//                     name,
//                     headline,
//                     description,
//                     points: numericPoints,
//                     measure,
//                     category,
//                     dateModified: sql`(CURRENT_TIMESTAMP)`,
//                     ...photos, // Apply optional photo updates
//                 })
//                 .where(
//                     sql`${services.id} = ${serviceId} AND ${services.userId} = ${currentUserId}`
//                 );

//             if (updateResult.changes === 0) {
//                  // Check if the service was not found OR if the user was not the owner
//                 return fail(403, { success: false, message: 'Unauthorized or service not found/no changes made.' });
//             }

//             // 3. Redirect to the detail page after success
//             throw redirect(303, `/services/${serviceId}`);

//         } catch (e) {
//             console.error('Service update failed:', e);
//             // If it's a SvelteKit error/redirect, re-throw it
//             if (e && (e as { status: number }).status) {
//                 throw e;
//             }
//             return fail(500, { success: false, message: 'Failed to update service due to a server error.' });
//         }
//     }
// };

