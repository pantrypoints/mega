import { error, redirect } from '@sveltejs/kit';
import { products, wishes } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

type ItemType = 'product' | 'wish';

const tables = {
  product: products,
  wish: wishes
};

const redirectPaths = {
  product: '/products',
  wish: '/wishes'
};

const itemNames = {
  product: 'Product',
  wish: 'Wish'
};

export function createEditLoader(type: ItemType) {
  return async ({ params, locals }: RequestEvent) => {
    const db = locals.db;
    const userId = locals.user?.id;
    
    if (!userId) {
      throw error(401, 'Unauthorized');
    }
    
    const itemId = params.id;
    const table = tables[type];
    
    const result = await db
      .select()
      .from(table)
      .where(eq(table.id, itemId))
      .limit(1);
    
    const item = result[0];
    
    if (!item || item.userId !== userId) {
      throw error(404, `${itemNames[type]} not found`);
    }
    
    return { item };
  };
}

export function createEditAction(type: ItemType) {
  return async ({ request, params, locals }: RequestEvent) => {
    const db = locals.db;
    const userId = locals.user?.id;
    
    if (!userId) {
      throw error(401, 'Unauthorized');
    }
    
    const itemId = params.id;
    const table = tables[type];
    const form = await request.formData();
    
    // Get all form fields
    const name = form.get('name')?.toString() ?? '';
    const headline = form.get('headline')?.toString() ?? '';
    const description = form.get('description')?.toString() ?? '';
    const points = parseFloat(form.get('points')?.toString() ?? '0');
    const measure = form.get('measure')?.toString() ?? '';
    const category = form.get('category')?.toString() ?? '';
    
    // Get photos (max 3 for both products and wishes)
    const photo1 = form.get('photo1')?.toString() || null;
    const photo2 = form.get('photo2')?.toString() || null;
    const photo3 = form.get('photo3')?.toString() || null;
    
    // Validate required fields
    if (!name || !points || !measure || !category) {
      throw error(400, 'Missing required fields');
    }
    
    // Update item
    await db
      .update(table)
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
      .where(and(
        eq(table.id, itemId),
        eq(table.userId, userId)
      ));
    
    throw redirect(303, `${redirectPaths[type]}/${itemId}`);
  };
}