import { error, fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { products, user, transactions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import bcrypt from 'bcryptjs';



// --- LOAD: Fetch Product Details ---
export const load: PageServerLoad = async ({ url, platform, locals }) => {

    // 1. Authorization Check: Ensure user is logged in (getter)
    const buyerUser = locals.user; 
    if (!buyerUser) {
        throw redirect(302, '/login'); // Redirect to login if unauthenticated
    }

    // 2. Extract product details from URL (passed from detail page)
    const requiredParams = ['productId', 'name', 'points', 'measure', 'category', 'photo', 'giverId'];
    const transactionData = Object.fromEntries(requiredParams.map(key => [key, url.searchParams.get(key)]));
    
    // Simple validation for required parameters
    if (requiredParams.some(key => !transactionData[key])) {
        throw error(400, 'Missing required transaction data. Please start from a product page.');
    }
    
    const productId = transactionData.productId as string;
    const giverId = transactionData.giverId as string;
    
    // 3. Fetch Giver (Seller) details for the confirmation step
    const db = getDb(platform?.env);

    try {
        const giverResult = await db.select({ 
            avatar: user.avatar, 
            codename: user.codename 
        })
        .from(user)
        .where(eq(user.id, giverId))
        .limit(1);

        const giver = giverResult[0];

        if (!giver) {
             throw error(404, 'Seller user not found.');
        }

        // 4. Return initial data needed for the form
        return {
            ...transactionData,
            points: parseFloat(transactionData.points as string), // Ensure points is a number
            giverAvatar: giver.avatar,
            giverCodename: giver.codename,
            buyerAvatar: buyerUser.avatar,
            buyerId: buyerUser.id,
        };
    } catch(e) {
        console.error("Failed to load giver details:", e);
        throw error(500, 'Server error while preparing transaction.');
    }
};

// --- ACTION: Handle Codename/PIN Validation and Transaction Creation ---
export const actions: Actions = {
    // Action for validating the buyer and confirming the transaction
    confirmTransaction: async ({ request, platform, locals }) => {
        const db = getDb(platform?.env);
        const buyerUser = locals.user; 

        if (!buyerUser) {
             return fail(401, { message: 'Authentication required to complete transaction.' });
        }
        
        const data = await request.formData();
        
        // Form inputs
        const codename = data.get('codename') as string;
        const pin = data.get('pin') as string;
        const amount = parseFloat(data.get('amount') as string);
        const totalPoints = parseFloat(data.get('totalPoints') as string);
        
        // Hidden fields (Giver and Product Info)
        const giverId = data.get('giverId') as string;
        const name = data.get('name') as string;
        const pointsPrice = parseFloat(data.get('pointsPrice') as string);
        const measure = data.get('measure') as string;
        const photo = data.get('photo') as string;
        const category = data.get('category') as string;
        
        // 1. Basic validation
        if (!codename || !pin || isNaN(amount) || amount <= 0 || isNaN(totalPoints)) {
            return fail(400, { 
                codename, pin, amount, totalPoints,
                message: 'Missing or invalid required fields (Codename, PIN, or Amount).' 
            });
        }
        
        // 2. Validate buyer Codename and PIN
        try {
            const buyerResult = await db.select()
                .from(user)
                .where(eq(user.id, buyerUser.id)) // Use authenticated ID for security
                .limit(1);

            const buyer = buyerResult[0];
            
            // Check if codename and pin match the current authenticated user
            if (buyer.codename !== codename || buyer.pin !== pin) {
                // If using bcrypt for PIN/Password:
                // if (buyer.codename !== codename || !bcrypt.compareSync(pin, buyer.pin)) { ... }
                return fail(401, { message: 'Invalid Codename or PIN for the authenticated user.', codename, pin, amount });
            }

            // 3. Final calculation check (Client-side amount * price must match totalPoints)
            if (Math.abs(amount * pointsPrice - totalPoints) > 0.001) {
                 return fail(400, { message: 'Points calculation mismatch. Please re-enter amount.', codename, pin, amount });
            }
            
            // 4. Create the Transaction Record
            await db.insert(transactions).values({
                name: name,
                points: totalPoints, // The total cost
                measure: measure,
                amount: amount,
                photo: photo,
                notes: `Purchase of ${amount} x ${name}`,
                kind: 'debt', // Buyer is incurring debt/making a transaction
                category: category,
                status: 'pending', // Awaiting Giver's approval
                giverId: giverId,
                getterId: buyerUser.id,
            });

        } catch (e) {
            console.error("Transaction creation failed:", e);
            return fail(500, { message: 'A server error occurred during transaction creation.' });
        }

        // 5. Success: Redirect to a success page or the product list
        throw redirect(302, '/products?success=transaction_created');
    }
};

