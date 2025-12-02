import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { user, products, services } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';


export const load: PageServerLoad = async ({ params, platform, locals }) => {
  const userId = params.id;

  if (!userId) {
    throw error(400, 'Invalid user ID');
  }

  try {
    const db = getDb(platform?.env);

    // Fetch user
    const foundUsers = await db
      .select()
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!foundUsers || foundUsers.length === 0) {
      throw error(404, 'User not found');
    }

    const foundUser = foundUsers[0];

    // Fetch user's products
    const userProducts = await db
      .select()
      .from(products)
      .where(eq(products.userId, userId))
      .orderBy(desc(products.dateCreated));

    // Fetch user's services
    const userServices = await db
      .select()
      .from(services)
      .where(eq(services.userId, userId))
      .orderBy(desc(services.dateCreated));

    return {
      user: foundUser,
      currentUser: locals.user,
      products: userProducts || [],
      services: userServices || []
    };
  } catch (err) {
    console.error('Error loading user:', err);
    if (err && typeof err === 'object' && 'status' in err) {
      throw err;
    }
    throw error(500, 'Failed to load user data');
  }
};
