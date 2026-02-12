import { getDb } from "$lib/server/db";
import { requests } from "$lib/server/db/schema";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";


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
    const description = form.get("description") as string | null;

    try {
      await db.insert(requests).values({
        name,
        measure,
        points,
        category,
        headline,
        photo1,
        description,
        userId: locals.user.id
      });
    } catch (err) {
      console.error("Database insert error", err);
      return fail(500, { message: "Could not create product." });
    }

    redirect(303, "/requests");   // perform redirect after success
  }
};
