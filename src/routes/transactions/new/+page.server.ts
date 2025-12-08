import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { user, transactions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export const load: PageServerLoad = async ({ url, locals }) => {
  console.log('=== Transaction New Page Load Started ===');
  
  const db = locals.db;
  const currentUserId = locals.user?.id || null;

  // Get transaction parameters from URL
  const serviceId = url.searchParams.get('serviceId');
  const name = url.searchParams.get('name');
  const points = url.searchParams.get('points');
  const measure = url.searchParams.get('measure');
  const category = url.searchParams.get('category');
  const photo = url.searchParams.get('photo');
  const giverId = url.searchParams.get('giverId');

  console.log('URL Params:', { serviceId, name, points, measure, category, photo, giverId });

  // Validate required parameters
  if (!serviceId || !name || !points || !measure || !giverId) {
    console.error('Missing required parameters:', {
      serviceId: !!serviceId,
      name: !!name,
      points: !!points,
      measure: !!measure,
      giverId: !!giverId
    });
    throw error(400, `Missing required transaction parameters. Check: serviceId=${!!serviceId}, name=${!!name}, points=${!!points}, measure=${!!measure}, giverId=${!!giverId}`);
  }

  try {
    console.log('Fetching giver info for:', giverId);
    
    // Fetch giver (seller) information
    const giverResult = await db
      .select({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      })
      .from(user)
      .where(eq(user.id, giverId))
      .limit(1);

    console.log('Giver query result:', giverResult);

    const giver = giverResult[0];

    if (!giver) {
      console.error('Seller not found for giverId:', giverId);
      throw error(404, 'Seller not found');
    }

    // Fetch buyer (current user) information if logged in
    let buyer = null;
    if (currentUserId) {
      console.log('Fetching buyer info for:', currentUserId);
      
      const buyerResult = await db
        .select({
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        })
        .from(user)
        .where(eq(user.id, currentUserId))
        .limit(1);

      console.log('Buyer query result:', buyerResult);
      buyer = buyerResult[0];
    } else {
      console.log('No current user logged in');
    }

    const responseData = {
      productId: serviceId,
      name,
      points: parseFloat(points),
      measure,
      category: category || 'N/A',
      photo: photo || 'https://placehold.co/400x400/0ea5e9/ffffff?text=No+Image',
      giverId: giver.id,
      giverAvatar: giver.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(giver.username)}&size=128&background=0ea5e9&color=fff`,
      giverCodename: giver.username,
      buyerId: buyer?.id || null,
      buyerAvatar: buyer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(buyer?.username || 'Guest')}&size=128&background=14b8a6&color=fff`,
    };

    console.log('=== Load function returning data ===');
    console.log(JSON.stringify(responseData, null, 2));

    return responseData;
  } catch (e) {
    console.error('=== Load function error ===');
    console.error('Error details:', e);
    console.error('Error stack:', e instanceof Error ? e.stack : 'No stack trace');
    
    // Re-throw SvelteKit errors
    if (e && typeof e === 'object' && 'status' in e) {
      throw e;
    }
    
    throw error(500, `Could not load transaction data: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
};

export const actions: Actions = {
  confirmTransaction: async ({ request, locals }) => {
    const db = locals.db;
    const currentUserId = locals.user?.id;

    if (!currentUserId) {
      return fail(401, { error: 'You must be logged in to create a transaction' });
    }

    const formData = await request.formData();
    const codename = formData.get('codename')?.toString();
    const pin = formData.get('pin')?.toString();
    const amount = parseFloat(formData.get('amount')?.toString() || '0');
    const totalPoints = parseFloat(formData.get('totalPoints')?.toString() || '0');
    const giverId = formData.get('giverId')?.toString();
    const name = formData.get('name')?.toString();
    const pointsPrice = parseFloat(formData.get('pointsPrice')?.toString() || '0');
    const measure = formData.get('measure')?.toString();
    const photo = formData.get('photo')?.toString();
    const category = formData.get('category')?.toString();

    // Validate inputs
    if (!codename || !pin || amount <= 0 || !giverId || !name || !measure || !category) {
      return fail(400, { error: 'Invalid transaction data' });
    }

    // Verify buyer exists and codename matches
    const buyerResult = await db
      .select()
      .from(user)
      .where(eq(user.id, currentUserId))
      .limit(1);

    const buyer = buyerResult[0];

    if (!buyer) {
      return fail(404, { error: 'Buyer not found' });
    }

    // Verify codename matches
    if (buyer.username !== codename) {
      return fail(401, { error: 'Codename does not match your account' });
    }

    // TODO: Verify PIN
    // if (buyer.pin !== hashPin(pin)) {
    //   return fail(401, { error: 'Invalid PIN' });
    // }

    // TODO: Check if buyer has enough points
    // if (buyer.points < totalPoints) {
    //   return fail(400, { error: 'Insufficient points' });
    // }

    try {
      // Create transaction record
      await db.insert(transactions).values({
        name,
        points: pointsPrice,
        measure,
        amount,
        photo,
        notes: null,
        kind: 'credit', // buyer gets credit, giver gets debt
        category,
        status: 'pending',
        giverId, // seller
        getterId: currentUserId, // buyer
        transfereeId: null,
      });

      // TODO: Update user points
      // - Deduct totalPoints from buyer
      // - Add totalPoints to seller

      console.log('Transaction created successfully');

      // Redirect to transactions list with success message
      throw redirect(303, '/transactions?success=true');
    } catch (e) {
      console.error('Transaction creation failed:', e);
      return fail(500, { error: 'Failed to create transaction' });
    }
  },
};




// import { error, fail, redirect } from '@sveltejs/kit';
// import type { PageServerLoad, Actions } from './$types';
// import { user, services } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';

// export const load: PageServerLoad = async ({ url, locals }) => {
//   const db = locals.db;
//   const currentUserId = locals.user?.id || null;

//   // Get transaction parameters from URL
//   const serviceId = url.searchParams.get('serviceId');
//   const name = url.searchParams.get('name');
//   const points = url.searchParams.get('points');
//   const measure = url.searchParams.get('measure');
//   const category = url.searchParams.get('category');
//   const photo = url.searchParams.get('photo');
//   const giverId = url.searchParams.get('giverId');

//   // Validate required parameters
//   if (!serviceId || !name || !points || !measure || !giverId) {
//     throw error(400, 'Missing required transaction parameters');
//   }

//   try {
//     // Fetch giver (seller) information
//     const giverResult = await db
//       .select({
//         id: user.id,
//         username: user.username,
//         avatar: user.avatar,
//       })
//       .from(user)
//       .where(eq(user.id, giverId))
//       .limit(1);

//     const giver = giverResult[0];

//     if (!giver) {
//       throw error(404, 'Seller not found');
//     }

//     // Fetch buyer (current user) information if logged in
//     let buyer = null;
//     if (currentUserId) {
//       const buyerResult = await db
//         .select({
//           id: user.id,
//           username: user.username,
//           avatar: user.avatar,
//         })
//         .from(user)
//         .where(eq(user.id, currentUserId))
//         .limit(1);

//       buyer = buyerResult[0];
//     }

//     // Return all necessary data
//     return {
//       productId: serviceId,
//       name,
//       points: parseFloat(points),
//       measure,
//       category: category || 'N/A',
//       photo: photo || 'https://placehold.co/400x400/0ea5e9/ffffff?text=No+Image',
//       giverId: giver.id,
//       giverAvatar: giver.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(giver.username)}&size=128&background=0ea5e9&color=fff`,
//       giverCodename: giver.username,
//       buyerId: buyer?.id || null,
//       buyerAvatar: buyer?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(buyer?.username || 'Guest')}&size=128&background=14b8a6&color=fff`,
//     };
//   } catch (e) {
//     console.error('Failed to load transaction data:', e);
//     throw error(500, 'Could not load transaction data');
//   }
// };

// export const actions: Actions = {
//   confirmTransaction: async ({ request, locals }) => {
//     const db = locals.db;
//     const currentUserId = locals.user?.id;

//     if (!currentUserId) {
//       return fail(401, { error: 'You must be logged in to create a transaction' });
//     }

//     const formData = await request.formData();
//     const codename = formData.get('codename')?.toString();
//     const pin = formData.get('pin')?.toString();
//     const amount = parseFloat(formData.get('amount')?.toString() || '0');
//     const totalPoints = parseFloat(formData.get('totalPoints')?.toString() || '0');
//     const giverId = formData.get('giverId')?.toString();
//     const name = formData.get('name')?.toString();
//     const pointsPrice = parseFloat(formData.get('pointsPrice')?.toString() || '0');
//     const measure = formData.get('measure')?.toString();
//     const photo = formData.get('photo')?.toString();
//     const category = formData.get('category')?.toString();

//     // Validate inputs
//     if (!codename || !pin || amount <= 0 || !giverId) {
//       return fail(400, { error: 'Invalid transaction data' });
//     }

//     // Verify PIN matches the logged-in user
//     const buyerResult = await db
//       .select()
//       .from(user)
//       .where(eq(user.id, currentUserId))
//       .limit(1);

//     const buyer = buyerResult[0];

//     if (!buyer) {
//       return fail(404, { error: 'Buyer not found' });
//     }

//     // TODO: Add PIN verification logic here
//     // if (buyer.pin !== hashPin(pin)) {
//     //   return fail(401, { error: 'Invalid PIN' });
//     // }

//     // TODO: Check if buyer has enough points
//     // TODO: Create transaction record in database
//     // TODO: Deduct points from buyer, add to seller

//     console.log('Transaction confirmed:', {
//       buyerId: currentUserId,
//       giverId,
//       amount,
//       totalPoints,
//       name,
//       pointsPrice,
//       measure,
//     });

//     // Redirect to success page or transactions list
//     throw redirect(303, '/transactions?success=true');
//   },
// };




// import { error, fail, redirect } from '@sveltejs/kit';
// import { getDb } from '$lib/server/db';
// import { products, user, transactions } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import type { PageServerLoad, Actions } from './$types';
// import bcrypt from 'bcryptjs';



// // --- LOAD: Fetch Product Details ---
// export const load: PageServerLoad = async ({ url, platform, locals }) => {

//     // 1. Authorization Check: Ensure user is logged in (getter)
//     const buyerUser = locals.user; 
//     if (!buyerUser) {
//         throw redirect(302, '/login'); // Redirect to login if unauthenticated
//     }

//     // 2. Extract product details from URL (passed from detail page)
//     const requiredParams = ['productId', 'name', 'points', 'measure', 'category', 'photo', 'giverId'];
//     const transactionData = Object.fromEntries(requiredParams.map(key => [key, url.searchParams.get(key)]));
    
//     // Simple validation for required parameters
//     if (requiredParams.some(key => !transactionData[key])) {
//         throw error(400, 'Missing required transaction data. Please start from a product page.');
//     }
    
//     const productId = transactionData.productId as string;
//     const giverId = transactionData.giverId as string;
    
//     // 3. Fetch Giver (Seller) details for the confirmation step
//     const db = getDb(platform?.env);

//     try {
//         const giverResult = await db.select({ 
//             avatar: user.avatar, 
//             codename: user.codename 
//         })
//         .from(user)
//         .where(eq(user.id, giverId))
//         .limit(1);

//         const giver = giverResult[0];

//         if (!giver) {
//              throw error(404, 'Seller user not found.');
//         }

//         // 4. Return initial data needed for the form
//         return {
//             ...transactionData,
//             points: parseFloat(transactionData.points as string), // Ensure points is a number
//             giverAvatar: giver.avatar,
//             giverCodename: giver.codename,
//             buyerAvatar: buyerUser.avatar,
//             buyerId: buyerUser.id,
//         };
//     } catch(e) {
//         console.error("Failed to load giver details:", e);
//         throw error(500, 'Server error while preparing transaction.');
//     }
// };

// // --- ACTION: Handle Codename/PIN Validation and Transaction Creation ---
// export const actions: Actions = {
//     // Action for validating the buyer and confirming the transaction
//     confirmTransaction: async ({ request, platform, locals }) => {
//         const db = getDb(platform?.env);
//         const buyerUser = locals.user; 

//         if (!buyerUser) {
//              return fail(401, { message: 'Authentication required to complete transaction.' });
//         }
        
//         const data = await request.formData();
        
//         // Form inputs
//         const codename = data.get('codename') as string;
//         const pin = data.get('pin') as string;
//         const amount = parseFloat(data.get('amount') as string);
//         const totalPoints = parseFloat(data.get('totalPoints') as string);
        
//         // Hidden fields (Giver and Product Info)
//         const giverId = data.get('giverId') as string;
//         const name = data.get('name') as string;
//         const pointsPrice = parseFloat(data.get('pointsPrice') as string);
//         const measure = data.get('measure') as string;
//         const photo = data.get('photo') as string;
//         const category = data.get('category') as string;
        
//         // 1. Basic validation
//         if (!codename || !pin || isNaN(amount) || amount <= 0 || isNaN(totalPoints)) {
//             return fail(400, { 
//                 codename, pin, amount, totalPoints,
//                 message: 'Missing or invalid required fields (Codename, PIN, or Amount).' 
//             });
//         }
        
//         // 2. Validate buyer Codename and PIN
//         try {
//             const buyerResult = await db.select()
//                 .from(user)
//                 .where(eq(user.id, buyerUser.id)) // Use authenticated ID for security
//                 .limit(1);

//             const buyer = buyerResult[0];
            
//             // Check if codename and pin match the current authenticated user
//             if (buyer.codename !== codename || buyer.pin !== pin) {
//                 // If using bcrypt for PIN/Password:
//                 // if (buyer.codename !== codename || !bcrypt.compareSync(pin, buyer.pin)) { ... }
//                 return fail(401, { message: 'Invalid Codename or PIN for the authenticated user.', codename, pin, amount });
//             }

//             // 3. Final calculation check (Client-side amount * price must match totalPoints)
//             if (Math.abs(amount * pointsPrice - totalPoints) > 0.001) {
//                  return fail(400, { message: 'Points calculation mismatch. Please re-enter amount.', codename, pin, amount });
//             }
            
//             // 4. Create the Transaction Record
//             await db.insert(transactions).values({
//                 name: name,
//                 points: totalPoints, // The total cost
//                 measure: measure,
//                 amount: amount,
//                 photo: photo,
//                 notes: `Purchase of ${amount} x ${name}`,
//                 kind: 'debt', // Buyer is incurring debt/making a transaction
//                 category: category,
//                 status: 'pending', // Awaiting Giver's approval
//                 giverId: giverId,
//                 getterId: buyerUser.id,
//             });

//         } catch (e) {
//             console.error("Transaction creation failed:", e);
//             return fail(500, { message: 'A server error occurred during transaction creation.' });
//         }

//         // 5. Success: Redirect to a success page or the product list
//         throw redirect(302, '/products?success=transaction_created');
//     }
// };

