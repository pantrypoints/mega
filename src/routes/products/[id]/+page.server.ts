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
          slug: user.slug
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
        ].filter(url => url),
      },
      owner: {
        id: owner?.id || product.userId,
        username: owner?.username || 'Unknown User',
        avatar: ownerAvatar,
        slug: owner?.slug
      },
      isOwner,
      currentUserId,
    };
  } catch (e) {
    console.error("Database query failed:", e);
    throw error(500, 'Could not load product data due to a server error.');
  }
};
