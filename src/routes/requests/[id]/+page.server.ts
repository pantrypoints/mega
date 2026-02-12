import { error } from '@sveltejs/kit';
import { requests, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { CircleUser } from 'lucide-svelte';



export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id || null;
  const requestId = params.id;

  if (!requestId) {
    throw error(404, 'Invalid request ID.');
  }

  try {
    // Join requests with user table to get owner information
    const result = await db
      .select({
        // Select all request fields
        request: requests,
        // Select owner information
        owner: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          slug: user.slug,
        }
      })
      .from(requests)
      .leftJoin(user, eq(requests.userId, user.id))
      .where(eq(requests.id, requestId))
      .limit(1);

    const data = result[0];

    if (!data || !data.request) {
      throw error(404, 'request not found.');
    }

    const request = data.request;
    const owner = data.owner;

    // Check if current user is the owner
    const isOwner = currentUserId !== null && currentUserId === request.userId;

    // Use actual avatar from database, with fallback
    const ownerAvatar = owner?.avatar || '/user.svg'

    return {
      request: {
        ...request,
        photos: [
          request.photo1,
          request.photo2,
          request.photo3,
          request.photo4,
          request.photo5,
          request.photo6,
        ].filter(url => url),
      },
      owner: {
        id: owner?.id || request.userId,
        username: owner?.username || 'Unknown User',
        avatar: ownerAvatar,
        slug: owner?.slug
      },
      isOwner,
      currentUserId,
    };
  } catch (e) {
    console.error("Database query failed:", e);
    throw error(500, 'Could not load request data due to a server error.');
  }
};


