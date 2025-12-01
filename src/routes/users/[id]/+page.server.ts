import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { user, products, services } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, platform }) => {
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



// import { error } from '@sveltejs/kit';
// import { getDb } from '$lib/server/db';
// import { user } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { PageServerLoad } from './$types';


// export const load: PageServerLoad = async ({ params, platform }) => {

//     const userId = params.id; 
    
//     // 1. Get the DB instance, handling the SvelteKit/Bun environment split
//     const db = getDb(platform?.env);

//     // 2. Extract and validate the product ID from the URL parameters
//     if (!userId || isNaN(parseInt(userId))) {
//         // This handles cases like /products/abc or /products/
//         throw error(404, 'Invalid ID format.');
//     }

//     try {
//         // 3. Query the database for the specific product
//         // We parse to int since the DB ID is an integer
//         const result = await db
//             .select()
//             .from(products)
//             .where(eq(products.id, parseInt(userId)))
//             .limit(1);

//         const user = result[0];

//         // 4. Handle 404 (Product not found)
//         if (!user) {
//             throw error(404, 'Product not found.');
//         }

//         // 5. Return the product data
//         return {product};
//     } catch (e) {
//         console.error("Database query failed:", e);
//         throw error(500, 'Could not load product data due to a server error.');
//     }
// };
