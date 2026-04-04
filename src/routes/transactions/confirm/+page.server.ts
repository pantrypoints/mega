import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { user, transactions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db;
  if (!locals.user) throw redirect(302, '/login');

  const initial = url.searchParams.get('initial');
  const name = url.searchParams.get('name');
  const points = url.searchParams.get('points');
  const measure = url.searchParams.get('measure');
  const category = url.searchParams.get('category');
  const photo = url.searchParams.get('photo');
  const amount = url.searchParams.get('amount');
  const giverId = url.searchParams.get('giverId');
  const getterId = url.searchParams.get('getterId');
  const kind = url.searchParams.get('kind');

  if (!initial || !name || !points || !measure || !category || !amount || !giverId || !getterId) {
    throw error(400, 'Missing transaction information');
  }

  const [giver] = await db.select().from(user).where(eq(user.id, giverId)).limit(1);
  const [getter] = await db.select().from(user).where(eq(user.id, getterId)).limit(1);

  if (!giver || !getter) throw error(404, 'Parties not found');

  const parsedPoints = parseFloat(points);
  const parsedAmount = parseFloat(amount);

  return {
    initial,
    kind,
    product: { name, points: parsedPoints, measure, category, photo: photo || null },
    amount: parsedAmount,
    totalPoints: parsedPoints * parsedAmount,
    giver: { id: giver.id, username: giver.username, avatar: giver.avatar },
    getter: { id: getter.id, username: getter.username, avatar: getter.avatar }
  };
};

export const actions: Actions = {
  // Changed from 'confirm' to 'default' for better reliability
  default: async ({ request, locals }) => {
    const db = locals.db;
    const formData = await request.formData();

    const initial = formData.get('initial')?.toString();
    const productName = formData.get('productName')?.toString();
    const productPoints = formData.get('productPoints')?.toString();
    const productMeasure = formData.get('productMeasure')?.toString();
    const productCategory = formData.get('productCategory')?.toString();
    const productPhoto = formData.get('productPhoto')?.toString();
    const amount = formData.get('amount')?.toString();
    const giverId = formData.get('giverId')?.toString();
    const getterId = formData.get('getterId')?.toString();
    const kind = formData.get('kind')?.toString();

    if (!initial || !productName || !productPoints || !amount || !giverId || !getterId || !kind) {
      throw error(400, 'Missing transaction data');
    }

    const parsedPoints = parseFloat(productPoints);
    const parsedAmount = parseFloat(amount);
    const totalPoints = parsedPoints * parsedAmount;

    const [transaction] = await db
      .insert(transactions)
      .values({
        initial,
        name: productName,
        points: totalPoints, // Schema expects total points for this transaction
        measure: productMeasure,
        amount: parsedAmount,
        photo: productPhoto || null,
        kind,
        category: productCategory,
        status: 'accepted',
        giverId,
        getterId
      })
      .returning();

    throw redirect(303, `/transactions/success?id=${transaction.id}&points=${totalPoints}`);
  }
};