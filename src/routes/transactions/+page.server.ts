import { transactions, user } from '$lib/server/db/schema';
import { desc, or, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id;

  if (!currentUserId) {
    return {
      transactions: [],
      currentUserId: null
    };
  }

  // Fetch only transactions where current user is either giver or getter
  const userTransactions = await db
    .select({
      // Transaction fields
      id: transactions.id,
      name: transactions.name,
      points: transactions.points,
      measure: transactions.measure,
      amount: transactions.amount,
      photo: transactions.photo,
      notes: transactions.notes,
      kind: transactions.kind,
      category: transactions.category,
      status: transactions.status,
      giverId: transactions.giverId,
      getterId: transactions.getterId,
      transfereeId: transactions.transfereeId,
      dateAccepted: transactions.dateAccepted,
      dateCancelled: transactions.dateCancelled,
      dateTransferred: transactions.dateTransferred,
      dateCreated: transactions.dateCreated,
      dateModified: transactions.dateModified,
      // Partner (giver) fields
      giverUsername: user.username,
      giverAvatar: user.avatar,
      // We'll get getter info separately
    })
    .from(transactions)
    .leftJoin(user, eq(transactions.giverId, user.id))
    .where(
      or(
        eq(transactions.giverId, currentUserId),
        eq(transactions.getterId, currentUserId)
      )
    )
    .orderBy(desc(transactions.dateCreated))
    .all();


  // GET ALLL GETTERS Get all unique getter IDs to fetch in one query
  const getterIds = [...new Set(userTransactions.map(t => t.getterId))];
  

  // Fetch all getters in one query FROM USERS
  const getters = await db
    .select({
      id: user.id,
      username: user.username,
      avatar: user.avatar
    })
    .from(user)
    .where(
      or(...getterIds.map(id => eq(user.id, id)))
    )
    .all();


  // Create a map for quick lookup
  const getterMap = new Map(getters.map(g => [g.id, g]));


  // Transform transactions to include partner info
  const transformedTransactions = userTransactions.map(transaction => {

    const isGiver = transaction.giverId === currentUserId;
    const partnerId = isGiver ? transaction.getterId : transaction.giverId;
    
    let partnerUsername: string;
    let partnerAvatar: string;
    
    if (isGiver) {
      // Current user is giver, partner is getter
      const getter = getterMap.get(transaction.getterId);
      partnerUsername = getter?.username || 'Unknown';
      partnerAvatar = getter?.avatar || 'unknown';
    } else {
      // Current user is getter, partner is giver
      partnerUsername = transaction.giverUsername || 'Unknown';
      partnerAvatar = transaction.giverAvatar || 'unknown';
    }

    return {
      id: transaction.id,
      name: transaction.name,
      points: transaction.points,
      measure: transaction.measure,
      amount: transaction.amount,
      photo: transaction.photo,
      notes: transaction.notes,
      kind: transaction.kind,
      category: transaction.category,
      status: transaction.status,
      giverId: transaction.giverId,
      getterId: transaction.getterId,
      transfereeId: transaction.transfereeId,
      dateAccepted: transaction.dateAccepted,
      dateCancelled: transaction.dateCancelled,
      dateTransferred: transaction.dateTransferred,
      dateCreated: transaction.dateCreated,
      dateModified: transaction.dateModified,
      partnerId,
      partnerUsername,
      partnerAvatar,
      isGiver
    };
  });

  return {
    transactions: transformedTransactions,
    currentUserId
  };
};






// import { transactions } from '$lib/server/db/schema';
// import { asc, desc } from 'drizzle-orm';
// import type { PageServerLoad } from './$types';


// export const load: PageServerLoad = async ({ locals }) => {
//   const db = locals.db;
//   const currentUserId = locals.user?.id;

//   if (!currentUserId) {
//     return {
//       transactions: [],
//       currentUserId: null
//     };
//   }

//   // Fetch all transactions (we'll filter client-side for better UX)
//   const allTransactions = await db
//     .select()
//     .from(transactions)
//     .orderBy(desc(transactions.dateCreated))
//     .all();

//   return {
//     transactions: allTransactions,
//     currentUserId
//   };
// };