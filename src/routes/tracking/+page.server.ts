import { tracker } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ locals }) => {
    // const db = locals.db;

    // Fetch all tracking logs, newest first
    // const logs = await db
    //     .select()
    //     .from(tracker)
    //     .orderBy(desc(tracker.dateCreated));

    const logs = await locals.db.select().from(tracker).orderBy(desc(tracker.dateCreated));

    return {
        logs
    };
};
