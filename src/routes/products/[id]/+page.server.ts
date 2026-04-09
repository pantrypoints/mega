import { createItemDetailLoader } from '$lib/server/item';
import { createDeleteAction } from '$lib/server/delete';
import { error, fail } from '@sveltejs/kit';
import { products } from '$lib/db/schema'; // adjust path to your schema
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';


export const load = createItemDetailLoader('product');

export const actions: Actions = {
  ...createDeleteAction('product')

    updateAmount: async ({ request, locals }) => {
        // 1. Check authentication
        if (!locals.user) {
            return fail(401, { message: 'Unauthorized' });
        }

        const formData = await request.formData();
        const productId = Number(formData.get('productId'));
        const newAmount = parseFloat(formData.get('amount') as string);

        if (isNaN(productId) || isNaN(newAmount)) {
            return fail(400, { message: 'Invalid data provided' });
        }

        try {
            // 2. Verify ownership before updating
            const [product] = await locals.db
                .select()
                .from(products)
                .where(eq(products.id, productId))
                .limit(1);

            if (!product || product.userId !== locals.user.id) {
                return fail(403, { message: 'You do not own this product' });
            }

            // 3. Perform the update
            await locals.db
                .update(products)
                .set({ 
                    amount: newAmount,
                    // Use standard JS ISO string or sql template depending on your DB driver
                    dateAmountChange: new Date().toISOString() 
                })
                .where(eq(products.id, productId));

            return { success: true, message: 'Amount updated successfully' };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Database update failed' });
        }
    }
};





// import { products } from '$lib/server/db/schema';
// import { getAuthorizedRecord, updateAuthorizedRecord } from '$lib/server/product';
// import { redirect, error } from '@sveltejs/kit';
// import type { PageServerLoad, Actions } from './$types';


// export const load: PageServerLoad = async ({ params, locals }) => {
//   const { record } = await getAuthorizedRecord(locals.db, products, params.id, locals.user?.id);
//   return { product: record };
// };

// export const actions: Actions = {
//   default: async ({ request, params, locals }) => {
//     const userId = locals.user?.id;
//     if (!userId) throw error(401, 'Unauthorized');

//     const form = await request.formData();
//     const data = Object.fromEntries(form.entries());
    
//     // Cast numbers where necessary
//     if (data.points) data.points = parseFloat(data.points as string);

//     await updateAuthorizedRecord(locals.db, products, params.id, userId, data);
//     throw redirect(303, `/products/${params.id}`);
//   }
// };




// import { error } from '@sveltejs/kit';
// import { products, user } from '$lib/server/db/schema'; // 💡 Import 'user' schema
// import { and, eq } from 'drizzle-orm';
// import type { PageServerLoad } from './$types';

// import { redirect } from '@sveltejs/kit';



// export const actions = {
//   delete: async ({ params, locals }) => {
//     const db = locals.db;
//     const currentUserId = locals.user?.id;

//     if (!currentUserId) {
//       throw error(401, 'Not authenticated');
//     }

//     const productId = params.id;

//     // allow delete only if owner
//     await db
//       .delete(products)
//       .where(
//         and(
//           eq(products.id, productId),
//           eq(products.userId, currentUserId)
//         )
//       );

//     throw redirect(303, '/products');
//   }
// };




// export const load: PageServerLoad = async ({ params, locals }) => {
//   const db = locals.db;
//   const currentUserId = locals.user?.id || null;
//   const productId = params.id;

//   if (!productId) {
//     throw error(404, 'Invalid product ID.');
//   }

//   try {
//     // Join products with user table to get owner information
//     const result = await db
//       .select({
//         // Select all product fields
//         product: products,
//         // Select owner information
//         owner: {
//           id: user.id,
//           username: user.username,
//           avatar: user.avatar,
//           slug: user.slug
//         }
//       })
//       .from(products)
//       .leftJoin(user, eq(products.userId, user.id))
//       .where(eq(products.id, productId))
//       .limit(1);

//     const data = result[0];

//     if (!data || !data.product) {
//       throw error(404, 'product not found.');
//     }

//     const product = data.product;
//     const owner = data.owner;

//     // Check if current user is the owner
//     const isOwner = currentUserId !== null && currentUserId === product.userId;

//     // Use actual avatar from database, with fallback
//     const ownerAvatar = owner?.avatar || '/user.svg';

//     return {
//       product: {
//         ...product,
//         photos: [
//           product.photo1,
//           product.photo2,
//           product.photo3,
//         ].filter(url => url),
//       },
//       owner: {
//         id: owner?.id || product.userId,
//         username: owner?.username || 'Unknown User',
//         avatar: ownerAvatar,
//         slug: owner?.slug
//       },
//       isOwner,
//       currentUserId,
//     };
//   } catch (e) {
//     console.error("Database query failed:", e);
//     throw error(500, 'Could not load product data due to a server error.');
//   }
// };
