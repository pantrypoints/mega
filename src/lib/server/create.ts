import { getDb } from "$lib/server/db";
import { services, requests } from "$lib/server/db/schema";
import { redirect, fail } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

type ItemType = 'service' | 'request';

export function createItemAction(type: ItemType) {
  return async ({ request, locals, platform }: RequestEvent) => {
    if (!locals.user) {
      redirect(302, "/login");
    }

    const db = getDb(platform?.env);
    const form = await request.formData();
    
    // Get common form data
    const name = form.get("name") as string;
    const measure = form.get("measure") as string;
    const points = Number(form.get("points"));
    const category = form.get("category") as string;
    const headline = form.get("headline") as string | null;
    const photo1 = form.get("photo1") as string | null;
    const description = form.get("description") as string | null;
    
    // Get additional photos based on type
    const maxPhotos = type === 'request' ? 6 : 3;
    const additionalPhotos: Record<string, string | null> = {};
    
    for (let i = 2; i <= maxPhotos; i++) {
      const photo = form.get(`photo${i}`) as string;
      if (photo) additionalPhotos[`photo${i}`] = photo;
    }
    
    const table = type === 'service' ? services : requests;
    const redirectPath = type === 'service' ? '/services' : '/requests';
    
    try {
      await db.insert(table).values({
        name,
        measure,
        points,
        category,
        headline,
        description,
        photo1,
        ...additionalPhotos,
        userId: locals.user.id
      });
    } catch (err) {
      console.error(`Database insert error for ${type}:`, err);
      return fail(500, { message: `Could not create ${type}.` });
    }

    redirect(303, redirectPath);
  };
}