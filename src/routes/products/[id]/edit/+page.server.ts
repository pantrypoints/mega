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
  update: async ({ request, params, locals }) => {
    const db = locals.db;
    const userId = locals.user?.id;

    if (!userId) {
      throw error(401, 'Unauthorized');
    }

    const productId = params.id;
    const form = await request.formData();

    const name = form.get('name')?.toString() ?? '';
    const headline = form.get('headline')?.toString() ?? '';
    const description = form.get('description')?.toString() ?? '';

    await db
      .update(products)
      .set({
        name,
        headline,
        description
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

