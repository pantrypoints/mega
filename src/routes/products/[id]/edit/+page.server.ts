import { error, redirect } from '@sveltejs/kit';
import { products } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
  const db = locals.db;
  const userId = locals.user?.id;

  if (!userId) {
    throw error(401, 'Unauthorized');
  }

  const productId = params.id;
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  const product = result[0];

  if (!product || product.userId !== userId) {
    throw error(404, 'Product not found');
  }

  return { product };
};




export const actions: Actions = {
  default: async ({ request, params, locals }) => {
    const db = locals.db;
    const userId = locals.user?.id;

    if (!userId) {
      throw error(401, 'Unauthorized');
    }

    const productId = params.id;
    const form = await request.formData();

    // Get all form fields
    const name = form.get('name')?.toString() ?? '';
    const headline = form.get('headline')?.toString() ?? '';
    const description = form.get('description')?.toString() ?? '';
    const points = parseFloat(form.get('points')?.toString() ?? '0');
    const measure = form.get('measure')?.toString() ?? '';
    const category = form.get('category')?.toString() ?? '';
    const photo1 = form.get('photo1')?.toString() || null;
    const photo2 = form.get('photo2')?.toString() || null;
    const photo3 = form.get('photo3')?.toString() || null;

    // Validate required fields
    if (!name || !points || !measure || !category) {
      throw error(400, 'Missing required fields');
    }

    // Update product with all fields
    await db
      .update(products)
      .set({
        name,
        headline,
        description,
        points,
        measure,
        category,
        photo1,
        photo2,
        photo3,
        dateModified: new Date().toISOString()
      })
      .where(
        and(
          eq(products.id, productId),
          eq(products.userId, userId)
        )
      );

    throw redirect(303, `/products/${productId}`);
  }
};



