import type { PageServerLoad, Actions } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';


export const load: PageServerLoad = async ({ url, locals }) => {
  const db = locals.db;

  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // Get product details from URL params
  const name = url.searchParams.get('name');
  const points = url.searchParams.get('points');
  const measure = url.searchParams.get('measure');
  const category = url.searchParams.get('category');
  const photo = url.searchParams.get('photo');
  const giverId = url.searchParams.get('giverId');

  if (!name || !points || !measure || !category || !giverId) {
    throw error(400, 'Missing product information');
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

  return {
    product: {
      name,
      points: parseFloat(points),
      measure,
      category,
      photo: photo || null
    },
    giver: {
      id: giver.id,
      username: giver.username,
      avatar: null // Add avatar field if you have it in your schema
    }
  };
};



export const actions: Actions = {
  verify: async ({ request, url, locals }) => {

    const db = locals.db;
    const formData = await request.formData();
    
    const codename = formData.get('codename')?.toString();
    const pin = formData.get('pin')?.toString();
    const amount = formData.get('amount')?.toString();
    const kind = formData.get('kind')?.toString();
    const giverId = formData.get('giverId')?.toString();

    const productName = formData.get('productName')?.toString();
    const productPoints = formData.get('productPoints')?.toString();
    const productMeasure = formData.get('productMeasure')?.toString();
    const productCategory = formData.get('productCategory')?.toString();
    const productPhoto = formData.get('productPhoto')?.toString();


  


    if (!codename || !pin || !amount || !giverId) {
      return fail(400, { 
        error: 'All fields are required',
        codename,
        amount
      });
    }

    // Find user by codename
    const [getter] = await db
      .select()
      .from(user)
      .where(eq(user.codename, codename))
      .limit(1);

    if (!getter) {
      return fail(400, { 
        error: 'No user found with this codename',
        codename,
        amount
      });
    }

    // Check if buyer is trying to buy their own item
    if (getter.id === giverId) {
      return fail(400, { 
        error: 'You cannot buy your own items',
        codename,
        amount
      });
    }

    // Verify PIN
    
    const isPinValid = await bcrypt.compare(pin, getter.pin);
    // (pin === getter.pin);
    
    if (!isPinValid) {
      return fail(400, { 
        error: 'Invalid PIN',
        codename,
        amount
      });
    }


    const [giver] = await db
      .select()
      .from(user)
      .where(eq(user.id, giverId))
      .limit(1);


    // Redirect to confirm page with all data
    const confirmParams = new URLSearchParams();
    confirmParams.set('name', productName || '');
    confirmParams.set('points', productPoints || '');
    confirmParams.set('measure', productMeasure || '');
    confirmParams.set('category', productCategory || '');
    confirmParams.set('photo', productPhoto || '');
    confirmParams.set('amount', amount);
    confirmParams.set('kind', kind);
    confirmParams.set('giverId', giverId);
    confirmParams.set('getterId', getter.id);
    // confirmParams.set('giverAvatar', giver.avatar);
    // confirmParams.set('getterAvatar', getter.avatar);
    // confirmParams.set('giverName', giver.username);
    // confirmParams.set('getterName', getter.username);


    throw redirect(303, `/transactions/confirm?${confirmParams.toString()}`);
  }
};

