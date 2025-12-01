import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ params, platform }) => {

    const productId = params.id; // <-- FIX: Changed from params.productId to params.id
    
    // 1. Get the DB instance, handling the SvelteKit/Bun environment split
    const db = getDb(platform?.env);

    // 2. Extract and validate the product ID from the URL parameters
    if (!productId || isNaN(parseInt(productId))) {
        // This handles cases like /products/abc or /products/
        throw error(404, 'Invalid Product ID format.');
    }

    try {
        // 3. Query the database for the specific product
        // We parse to int since the DB ID is an integer
        const result = await db
            .select()
            .from(products)
            .where(eq(products.id, parseInt(productId)))
            .limit(1);

        const product = result[0];

        // 4. Handle 404 (Product not found)
        if (!product) {
            throw error(404, 'Product not found.');
        }

        // 5. Return the product data
        return {
            product: {
                // Ensure photo URLs are an array for easy iteration in the Svelte file
                ...product,
                photos: [
                    product.photo1,
                    product.photo2,
                    product.photo3,
                    product.photo4,
                    product.photo5,
                    product.photo6,
                ].filter(url => url), // Filter out any null/undefined photos
            },
        };
    } catch (e) {
        console.error("Database query failed:", e);
        throw error(500, 'Could not load product data due to a server error.');
    }
};




// import { error } from '@sveltejs/kit';
// import { getDb } from '$lib/server/db';
// import { products } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { PageServerLoad } from './$types';



// export const load: PageServerLoad = async ({ params, platform, locals }) => {
    
//     const productId = params.id; // <-- FIX: Changed from params.productId to params.id
    
//     // Check if the current user is available (assuming auth setup exposes user via locals)
//     // NOTE: Replace locals.user.id with your actual authenticated user ID access method.
//     const currentUserId = locals.user?.id; // Assuming locals.user exists after authentication

//     // 1. Get the DB instance, handling the SvelteKit/Bun environment split
//     const db = getDb(platform?.env);

//     // 2. Extract and validate the product ID from the URL parameters
//     if (!productId || isNaN(parseInt(productId))) {
//         // This handles cases like /products/abc or /products/
//         throw error(404, 'Invalid Product ID format.');
//     }


//     try {
//         // 1. Query the database for the specific product, joining with user to get owner data
//         const result = await db
//             .select({
//                 product: products,
//                 ownerAvatar: user.avatar,
//             })
//             .from(products)
//             .where(eq(products.id, parseInt(productId)))
//             .leftJoin(user, eq(products.userId, user.id))
//             .limit(1);

//         const productWithOwner = result[0];

//         if (!productWithOwner || !productWithOwner.product) {
//             throw error(404, 'Product not found.');
//         }

//         const product = productWithOwner.product;

//         // 2. Check ownership and return data
//         const isOwner = currentUserId === product.userId;

//         // 3. Return the product data, ownership status, and owner's avatar
//         return {
//             product: {
//                 ...product,
//                 photos: [
//                     product.photo1,
//                     product.photo2,
//                     product.photo3,
//                     product.photo4,
//                     product.photo5,
//                     product.photo6,
//                 ].filter(url => url),
//             },
//             isOwner,
//             ownerAvatar: productWithOwner.ownerAvatar,
//             currentUserId,
//         };
//     } catch (e) {
//         console.error("Database query failed:", e);
//         throw error(500, 'Could not load product data due to a server error.');
//     }

// };

