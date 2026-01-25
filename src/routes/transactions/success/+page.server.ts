import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { transactions, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db;
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  const transactionId = url.searchParams.get('id');
  const points = url.searchParams.get('points');

  if (!transactionId) {
    throw error(400, 'Missing transaction ID');
  }

  // Get transaction details
  const [transaction] = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, parseInt(transactionId)))
    .limit(1);

  if (!transaction) {
    throw error(404, 'Transaction not found');
  }

  // Get giver details
  const [giver] = await db
    .select({
      id: user.id,
      username: user.username,
      avatar: user.avatar
     })
    .from(user)
    .where(eq(user.id, transaction.giverId))
    .limit(1);

  // Get getter details
  const [getter] = await db
    .select({
      id: user.id,
      username: user.username,
      avatar: user.avatar
    })
    .from(user)
    .where(eq(user.id, transaction.getterId))
    .limit(1);

  return {
    transaction: {
      id: transaction.id,
      name: transaction.name,
      points: transaction.points,
      kind: transaction.kind,
      measure: transaction.measure,
      amount: transaction.amount,
      category: transaction.category,
      status: transaction.status,
      dateCreated: transaction.dateCreated,
      giverId: transaction.giverId,
      getterId: transaction.getterId
    },
    giver,
    getter,
    totalPoints: points ? parseFloat(points) : transaction.points
  };
};

