import { getDb } from '$lib/server/db';
import { requests } from '$lib/server/db/schema';
import { like, sql, asc, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';



// Define the shape of the sort parameter
type SortKey = 'name' | 'points' | 'dateCreated';
type SortDirection = 'asc' | 'desc';


// This function loads the list of requests with search, sort, and filter capabilities.
export const load: PageServerLoad = async ({ url, platform }) => {
    const db = getDb(platform?.env);

    // --- 1. Get Query Parameters ---
    const search = url.searchParams.get('search') || '';
    const sort = (url.searchParams.get('sort') as SortKey) || 'dateCreated';
    const direction = (url.searchParams.get('direction') as SortDirection) || 'desc';


    // --- 2. Build Query Filters ---
    let whereClause = undefined;
    if (search) {
        // Use ILIKE (or LIKE with lower()) for case-insensitive searching on name and description
        const searchPattern = `%${search.toLowerCase()}%`;
        whereClause = sql`${sql.raw('lower(name)')} like ${searchPattern} or ${sql.raw('lower(description)')} like ${searchPattern}`;
    }

    // --- 3. Determine Sorting Order ---
    let orderByClause: any = undefined;
    const sortColumn = requests[sort];

    if (sortColumn) {
        orderByClause = direction === 'asc' ? asc(sortColumn) : desc(sortColumn);
    } else {
        // Fallback to default sort if an invalid column is provided
        orderByClause = desc(requests.dateCreated);
    }

    try {
        // --- 4. Execute Query ---
        const result = await db
            .select()
            .from(requests)
            .where(whereClause)
            .orderBy(orderByClause);

        const serviceList = result.map(p => ({
            ...p,
            // Expose the main photo for the list view
            mainPhoto: p.photo1,
        }));

        // 5. Return the product list and current search/sort state
        return {
            requests: serviceList,
            search,
            sort,
            direction,
        };
    } catch (e) {
        console.error("Database query failed:", e);
        // Return an empty list or an error message on failure
        return {
            requests: [],
            search,
            sort,
            direction,
            error: 'Failed to load requests. Please check the database connection.',
        };
    }
};
