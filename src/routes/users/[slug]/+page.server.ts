import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { user as userTable, products, services, transactions } from '$lib/server/db/schema'; 
import { eq, desc, or } from 'drizzle-orm';


export const load: PageServerLoad = async ({ params, platform, locals }) => {
    const { slug } = params;

    if (!slug) {
        throw error(400, 'User slug is required');
    }

    try {
        const db = getDb(platform?.env);

        // 1. Fetch user by slug
        const foundUsers = await db
            .select()
            .from(userTable)
            .where(eq(userTable.slug, slug))
            .limit(1);

        if (!foundUsers || foundUsers.length === 0) {
            throw error(404, 'User not found');
        }

        const foundUser = foundUsers[0];
        const userId = foundUser.id; // Extract the actual ID from the found user record

        // 2. Fetch user's products using the ID we just found
        const userProducts = await db
            .select()
            .from(products)
            .where(eq(products.userId, userId))
            .orderBy(desc(products.dateCreated));

        // 3. Fetch user's services using the ID we just found
        const userServices = await db
            .select()
            .from(services)
            .where(eq(services.userId, userId))
            .orderBy(desc(services.dateCreated));

  

        // 4. Fetch all transactions involving this user
        const allTransactions = await db
            .select()
            .from(transactions)
            .where(
                or(
                    eq(transactions.giverId, userId),
                    eq(transactions.getterId, userId)
                )
            );

        // 5. Calculate counts for the table
        const stats = {
            exchangeAsGiver: allTransactions.filter(t => t.kind === 'exchange' && t.giverId === userId).length,
            exchangeAsGetter: allTransactions.filter(t => t.kind === 'exchange' && t.getterId === userId).length,
            donationAsGiver: allTransactions.filter(t => t.kind === 'donation' && t.giverId === userId).length,
            donationAsGetter: allTransactions.filter(t => t.kind === 'donation' && t.getterId === userId).length,
        };

        return {
            user: foundUser,
            currentUser: locals.user,
            products: userProducts ?? [],
            services: userServices ?? [],
            stats // Pass the calculated counts to the frontend
        };


    } catch (err) {
        console.error('Error loading user profile:', err);
        
        // Re-throw SvelteKit errors (like the 404 above)
        if (err && typeof err === 'object' && 'status' in err) {
            throw err;
        }
        
        throw error(500, 'Failed to load user data');
    }
};