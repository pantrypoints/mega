import { error, redirect } from '@sveltejs/kit';
import { services, requests } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';


type ItemType = 'service' | 'request';

export function createEditLoader(type: ItemType) {
  const table = type === 'service' ? services : requests;
  const itemName = type === 'service' ? 'service' : 'request';
  const redirectPath = type === 'service' ? '/services' : '/requests';
  
  return async ({ params, locals }: RequestEvent) => {
    const db = locals.db;
    const userId = locals.user?.id;
    const itemId = params.id;
    
    if (!userId) throw redirect(302, '/login');
    
    const [item] = await db
      .select()
      .from(table)
      .where(and(eq(table.id, itemId), eq(table.userId, userId)))
      .limit(1);
    
    if (!item) throw error(404, `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} not found`);
    
    return { [itemName]: item };
  };
}

export function createEditAction(type: ItemType) {
  const table = type === 'service' ? services : requests;
  const redirectPath = type === 'service' ? '/services' : '/requests';
  const itemName = type === 'service' ? 'service' : 'request';
  
  return async ({ params, request, locals }: RequestEvent) => {
    const db = locals.db;
    const userId = locals.user?.id;
    const itemId = params.id;
    
    if (!userId) throw redirect(302, '/login');
    
    const data = await request.formData();
    
    const name = data.get('name')?.toString() ?? '';
    const headline = data.get('headline')?.toString() ?? '';
    const description = data.get('description')?.toString() ?? '';
    const measure = data.get('measure')?.toString() ?? '';
    const category = data.get('category')?.toString() ?? '';
    const points = parseFloat(data.get('points')?.toString() ?? '0');
    
    // Max 3 photos for both services and requests
    const photoFields = ['photo1', 'photo2', 'photo3'];
    const photos: Record<string, string | null> = {};
    for (const f of photoFields) {
      photos[f] = data.get(f)?.toString() || null;
    }
    
    if (!name || !measure || !category || points <= 0) {
      throw error(400, 'Missing required fields');
    }
    
    await db
      .update(table)
      .set({
        name,
        headline,
        description,
        measure,
        category,
        points,
        dateModified: sql`(CURRENT_TIMESTAMP)`,
        ...photos
      })
      .where(and(eq(table.id, itemId), eq(table.userId, userId)));
    
    throw redirect(303, `${redirectPath}/${itemId}`);
  };
}

