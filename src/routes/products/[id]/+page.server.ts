import { error } from '@sveltejs/kit';
import { products, user } from '$lib/server/db/schema'; // 💡 Import 'user' schema
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';



export const actions = {
  delete: async ({ params, locals }) => {
    const db = locals.db;
    const currentUserId = locals.user?.id;

    if (!currentUserId) {
      throw error(401, 'Not authenticated');
    }

    const productId = params.id;

    // allow delete only if owner
    await db
      .delete(products)
      .where(
        and(
          eq(products.id, productId),
          eq(products.userId, currentUserId)
        )
      );

    throw redirect(303, '/products');
  }
};




export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id || null;
  const productId = params.id;

  if (!productId) {
    throw error(404, 'Invalid product ID.');
  }

  try {
    // Join products with user table to get owner information
    const result = await db
      .select({
        // Select all product fields
        product: products,
        // Select owner information
        owner: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        }
      })
      .from(products)
      .leftJoin(user, eq(products.userId, user.id))
      .where(eq(products.id, productId))
      .limit(1);

    const data = result[0];

    if (!data || !data.product) {
      throw error(404, 'product not found.');
    }

    const product = data.product;
    const owner = data.owner;

    // Check if current user is the owner
    const isOwner = currentUserId !== null && currentUserId === product.userId;

    // Use actual avatar from database, with fallback
    const ownerAvatar = owner?.avatar || '/user.svg';

    return {
      product: {
        ...product,
        photos: [
          product.photo1,
          product.photo2,
          product.photo3,
          product.photo4,
          product.photo5,
          product.photo6,
        ].filter(url => url),
      },
      owner: {
        id: owner?.id || product.userId,
        username: owner?.username || 'Unknown User',
        avatar: ownerAvatar,
      },
      isOwner,
      currentUserId,
    };
  } catch (e) {
    console.error("Database query failed:", e);
    throw error(500, 'Could not load product data due to a server error.');
  }
};




// export const load: PageServerLoad = async ({ params, platform }) => {
//     const productId = params.id;
//     const db = getDb(platform?.env);

//     if (!productId || isNaN(parseInt(productId))) {
//         throw error(404, 'Invalid Product ID format.');
//     }

//     try {
//         // 3. Query the database, joining products with the user table (seller)
//         const result = await db
//             .select({
//                 product: products, // Select all product fields
//                 ownerAvatar: user.avatar, // 💡 Select the seller's avatar
//                 ownerName: user.username, // 💡 Select the seller's username (ownerName)
//             })
//             .from(products)
//             // Join products table with user table on the userId column
//             .innerJoin(user, eq(products.userId, user.id))
//             .where(eq(products.id, parseInt(productId)))
//             .limit(1);

//         const row = result[0];

//         // 4. Handle 404 (Product not found)
//         if (!row) {
//             throw error(404, 'Product not found.');
//         }

//         const product = row.product;
//         const ownerAvatar = row.ownerAvatar; // Extracted owner avatar
//         const ownerName = row.ownerName; // 💡 Extracted owner name

//         // 5. Return the product data, ownerAvatar, and ownerName
//         return {
//             product: {
//                 // Ensure photo URLs are an array for easy iteration in the Svelte file
//                 ...product,
//                 photos: [
//                     product.photo1, product.photo2, product.photo3, product.photo4, product.photo5, product.photo6,
//                 ].filter(url => url), // Filter out any null/undefined photos
//             },
//             // 💡 Return the ownerAvatar and ownerName so they are accessible in the .svelte file
//             ownerAvatar: ownerAvatar,
//             ownerName: ownerName,
//         };
//     } catch (e) {
//         console.error("Database query failed:", e);
//         // If the error is not a 404, throw a general server error
//         if (e instanceof Error && (e as any).status === 404) {
//              throw e;
//         }
//         throw error(500, 'Could not load product data due to a server error.');
//     }
// };

