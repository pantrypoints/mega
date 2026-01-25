import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { transactions, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const currentUserId = locals.user?.id;
  
  if (!currentUserId) {
    throw redirect(302, '/login');
  }
  
  const transactionId = parseInt(params.id);
  
  if (isNaN(transactionId)) {
    throw error(400, 'Invalid transaction ID');
  }
  
  // Fetch transaction with user details
  const transaction = await db
    .select({
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
    })
    .from(transactions)
    .where(eq(transactions.id, transactionId))
    .limit(1)
    .then(rows => rows[0]);
  
  if (!transaction) {
    throw error(404, 'Transaction not found');
  }
  
  // Check if current user is authorized to view this transaction
  const isAuthorized = 
    transaction.giverId === currentUserId || 
    transaction.getterId === currentUserId;
  
  if (!isAuthorized) {
    throw error(403, 'You are not authorized to view this transaction');
  }
  
  return {
    transaction,
    currentUserId
  };
};

