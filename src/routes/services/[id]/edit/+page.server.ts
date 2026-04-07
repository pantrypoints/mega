// from chatgpt fixin error of prevous
import { error, redirect } from '@sveltejs/kit';
import { services } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';


export const load: PageServerLoad = async ({ params, locals }) => {
    const db = locals.db;
    const userId = locals.user?.id;
    const serviceId = params.id;

    if (!userId) throw redirect(302, '/login');

    const [service] = await db
        .select()
        .from(services)
        .where(and(eq(services.id, serviceId), eq(services.userId, userId)))
        .limit(1);

    if (!service) throw error(404, 'Service not found');

    return { service };
};

export const actions: Actions = {
    default: async ({ params, request, locals }) => {
        const db = locals.db;
        const userId = locals.user?.id;
        const serviceId = params.id;

        if (!userId) throw redirect(302, '/login');

        const data = await request.formData();

        const name = data.get('name')?.toString() ?? '';
        const headline = data.get('headline')?.toString() ?? '';
        const description = data.get('description')?.toString() ?? '';
        const measure = data.get('measure')?.toString() ?? '';
        const category = data.get('category')?.toString() ?? '';
        const points = parseFloat(data.get('points')?.toString() ?? '0');

        const photoFields = ['photo1','photo2','photo3','photo4','photo5','photo6'];
        const photos: Record<string, string | null> = {};
        for (const f of photoFields) photos[f] = data.get(f)?.toString() || null;

        if (!name || !measure || !category || points <= 0)
            throw error(400, 'Missing required fields');

        await db
            .update(services)
            .set({
                name, headline, description, measure, category, points, dateModified: sql`(CURRENT_TIMESTAMP)`, ...photos
            })
            .where(and(eq(services.id, serviceId), eq(services.userId, userId)));

        throw redirect(303, `/services/${serviceId}`);
    }
};