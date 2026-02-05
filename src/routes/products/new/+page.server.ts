// from gemini jundalisay ata 

import { getDb } from "$lib/server/db";
import { products } from "$lib/server/db/schema";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { m } from '$lib/paraglide/messages.js';


export const actions: Actions = {
  default: async ({ request, locals, platform }) => {
    if (!locals.user) {
      redirect(302, "/login");
    }

    const db = getDb(platform?.env);

    const form = await request.formData();
    const name = form.get("name") as string;
    const measure = form.get("measure") as string;
    const points = Number(form.get("points"));
    const category = form.get("category") as string;
    const headline = form.get("headline") as string | null;
    const photo1 = form.get("photo1") as string | null;
    const photo2 = form.get("photo2") as string | null;
    const photo3 = form.get("photo3") as string | null;
    const description = form.get("description") as string | null;

    try {
      await db.insert(products).values({
        name,
        measure,
        points,
        category,
        headline,
        photo1,
        photo2,
        photo3, 
        description,
        userId: locals.user.id
      });
    } catch (err) {
      console.error("Database insert error", err);
      return fail(500, { message: m.error() });
    }

    redirect(303, "/products");   // perform redirect after success
  }
};

