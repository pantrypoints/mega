import { error } from '@sveltejs/kit';
import { wishes, user } from '$lib/server/db/schema'; // 💡 Import 'user' schema
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

    const wishId = params.id;

    // allow delete only if owner
    await db
      .delete(wishes)
      .where(
        and(
          eq(wishes.id, wishId),
          eq(wishes.userId, currentUserId)
        )
      );

    throw redirect(303, '/wishes');
  }
};




export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id || null;
  const wishId = params.id;

  if (!wishId) {
    throw error(404, 'Invalid wish ID.');
  }

  try {
    // Join wishes with user table to get owner information
    const result = await db
      .select({
        // Select all wish fields
        wish: wishes,
        // Select owner information
        owner: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        }
      })
      .from(wishes)
      .leftJoin(user, eq(wishes.userId, user.id))
      .where(eq(wishes.id, wishId))
      .limit(1);

    const data = result[0];

    if (!data || !data.wish) {
      throw error(404, 'wish not found.');
    }

    const wish = data.wish;
    const owner = data.owner;

    // Check if current user is the owner
    const isOwner = currentUserId !== null && currentUserId === wish.userId;

    // Use actual avatar from database, with fallback
    const ownerAvatar = owner?.avatar || '/user.svg';

    return {
      wish: {
        ...wish,
        photos: [
          wish.photo1,
          wish.photo2,
          wish.photo3,
          wish.photo4,
          wish.photo5,
          wish.photo6,
        ].filter(url => url),
      },
      owner: {
        id: owner?.id || wish.userId,
        username: owner?.username || 'Unknown User',
        avatar: ownerAvatar,
      },
      isOwner,
      currentUserId,
    };
  } catch (e) {
    console.error("Database query failed:", e);
    throw error(500, 'Could not load wish data due to a server error.');
  }
};

