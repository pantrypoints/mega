import { getDb } from "$lib/server/db";
import { products, wishes } from "$lib/server/db/schema";
import { redirect, fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";


type ItemType = 'product' | 'wish';

export function createItemAction(type: ItemType) {
  const table = type === 'product' ? products : wishes;
  const redirectPath = type === 'product' ? '/products' : '/wishes';
  const itemName = type === 'product' ? 'product' : 'wish';
  
  return async ({ request, locals, platform }: RequestEvent) => {
    if (!locals.user) {
      redirect(302, "/login");
    }

    const db = getDb(platform?.env);
    const form = await request.formData();
    
    // Common fields
    const name = form.get("name") as string;
    const measure = form.get("measure") as string;
    const points = Number(form.get("points"));
    const category = form.get("category") as string;
    const headline = form.get("headline") as string | null;
    const description = form.get("description") as string | null;
    
    // Photo fields
    const photos: Record<string, string | null> = {};
    for (let i = 1; i <= 3; i++) {
      const photo = form.get(`photo${i}`) as string;
      if (photo) photos[`photo${i}`] = photo;
    }
    
    try {
      await db.insert(table).values({
        name,
        measure,
        points,
        category,
        headline,
        description,
        ...photos,
        userId: locals.user.id
      });
    } catch (err) {
      console.error(`Database insert error for ${itemName}:`, err);
      return fail(500, { message: `Could not create ${itemName}.` });
    }

    redirect(303, redirectPath);
  };
}

