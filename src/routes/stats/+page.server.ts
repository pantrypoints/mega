import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { sql, asc, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {

    // Use strftime to extract the Year-Month string from the dateCreated column
    const monthYearSql = sql<string>`strftime('%Y-%m', ${user.date_created})`.as('monthYear');
    
    try {
        const userRegistrations = await db
            .select({
                monthYear: monthYearSql,
                count: count().as('count'),
            })
            .from(user)
            .groupBy(monthYearSql)
            .orderBy(asc(monthYearSql))
            .all();

        // Map the result to an array of objects { monthYear: string, count: number }
        const formattedRegistrations = userRegistrations.map(r => ({
            monthYear: r.monthYear,
            count: Number(r.count),
        }));

        return {
            userRegistrations: formattedRegistrations,
        };
    } catch (error) {
        console.error('Failed to load user statistics from database:', error);
        // Return an empty array on failure so the component doesn't break
        return {
            userRegistrations: [],
            error: 'Failed to fetch statistics. Please check database connection and migration status.',
        };
    }
};