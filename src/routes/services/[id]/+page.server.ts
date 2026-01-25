import { error } from '@sveltejs/kit';
import { services, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { CircleUser } from 'lucide-svelte';



export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id || null;
  const serviceId = params.id;

  if (!serviceId) {
    throw error(404, 'Invalid service ID.');
  }

  try {
    // Join services with user table to get owner information
    const result = await db
      .select({
        // Select all service fields
        service: services,
        // Select owner information
        owner: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        }
      })
      .from(services)
      .leftJoin(user, eq(services.userId, user.id))
      .where(eq(services.id, serviceId))
      .limit(1);

    const data = result[0];

    if (!data || !data.service) {
      throw error(404, 'Service not found.');
    }

    const service = data.service;
    const owner = data.owner;

    // Check if current user is the owner
    const isOwner = currentUserId !== null && currentUserId === service.userId;

    // Use actual avatar from database, with fallback
    const ownerAvatar = owner?.avatar || '/user.svg'

    return {
      service: {
        ...service,
        photos: [
          service.photo1,
          service.photo2,
          service.photo3,
          service.photo4,
          service.photo5,
          service.photo6,
        ].filter(url => url),
      },
      owner: {
        id: owner?.id || service.userId,
        username: owner?.username || 'Unknown User',
        avatar: ownerAvatar,
      },
      isOwner,
      currentUserId,
    };
  } catch (e) {
    console.error("Database query failed:", e);
    throw error(500, 'Could not load service data due to a server error.');
  }
};


