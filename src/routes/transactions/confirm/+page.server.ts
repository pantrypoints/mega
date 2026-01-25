 import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
// import { db } from '$lib/server/db';
import { user, transactions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db;

  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // Get transaction details from URL params
  const name = url.searchParams.get('name');
  const points = url.searchParams.get('points');
  const measure = url.searchParams.get('measure');
  const category = url.searchParams.get('category');
  const photo = url.searchParams.get('photo');
  const amount = url.searchParams.get('amount');
  const giverId = url.searchParams.get('giverId');
  const getterId = url.searchParams.get('getterId');
  const kind = url.searchParams.get('kind');
  // const getterAvatar = url.searchParams.get('getterAvatar');
  // const giverName = url.searchParams.get('giverName');
  // const getterName = url.searchParams.get('getterName');


  if (!name || !points || !measure || !category || !amount || !giverId || !getterId) {
    throw error(400, 'Missing transaction information');
  }

  // Get giver (seller) details
  const [giver] = await db
    .select()
    .from(user)
    .where(eq(user.id, giverId))
    .limit(1);

  if (!giver) {
    throw error(404, 'Seller not found');
  }

  // Get getter (buyer) details
  const [getter] = await db
    .select()
    .from(user)
    .where(eq(user.id, getterId))
    .limit(1);

  if (!getter) {
    throw error(404, 'Buyer not found');
  }

  const parsedPoints = parseFloat(points);
  const parsedAmount = parseFloat(amount);
  const totalPoints = parsedPoints * parsedAmount;

  return {
    product: {
      name,
      points: parsedPoints,
      measure,
      category,
      photo: photo || null
    },
    amount: parsedAmount,
    totalPoints,
    kind,
    giver: {
      id: giver.id,
      username: giver.username,
      avatar: giver.avatar
    },
    getter: {
      id: getter.id,
      username: getter.username,
      codename: getter.codename,
      avatar: getter.avatar
    }
  };
};



export const actions: Actions = {
  confirm: async ({ request, locals }) => {

    const db = locals.db;

    const formData = await request.formData();
    
    const productName = formData.get('productName')?.toString();
    const productPoints = formData.get('productPoints')?.toString();
    const productMeasure = formData.get('productMeasure')?.toString();
    const productCategory = formData.get('productCategory')?.toString();
    const productPhoto = formData.get('productPhoto')?.toString();
    const amount = formData.get('amount')?.toString();
    const giverId = formData.get('giverId')?.toString();
    const getterId = formData.get('getterId')?.toString();
    const kind = formData.get('kind')?.toString();


    if (!productName || !productPoints || !productMeasure || !productCategory || !amount || !giverId || !getterId || !kind) {
      throw error(400, 'Missing transaction data');
    }

    const parsedPoints = parseFloat(productPoints);
    const parsedAmount = parseFloat(amount);
    const totalPoints = parsedPoints * parsedAmount;

    // Create transaction record
    const [transaction] = await db
      .insert(transactions)
      .values({
        name: productName,
        points: totalPoints,
        measure: productMeasure,
        amount: parsedAmount,
        photo: productPhoto || null,
        notes: null,
        kind: kind,
        category: productCategory,
        status: 'accepted', 
        giverId: giverId,
        getterId: getterId,
        transfereeId: null,
        dateAccepted: null,
        dateCancelled: null,
        dateTransferred: null
      })
      .returning();

    // Redirect to success page
    throw redirect(303, `/transactions/success?id=${transaction.id}&points=${totalPoints}`);
  }
};

