import { sql, asc, desc } from 'drizzle-orm';

export async function getResourceList({ db, table, url, searchFields = ['name', 'description'] }: any) {
    const search = url.searchParams.get('search') || '';
    const sort = url.searchParams.get('sort') || 'dateCreated';
    const direction = url.searchParams.get('direction') || 'desc';

    // 1. Build Search Filter
    let whereClause = undefined;
    if (search) {
        const searchPattern = `%${search.toLowerCase()}%`;
        const conditions = searchFields.map(field => 
            sql`${sql.raw(`lower(${field})`)} like ${searchPattern}`
        );
        whereClause = sql.join(conditions, sql.raw(' or '));
    }

    // 2. Build Sorting
    const sortColumn = table[sort];
    const orderByClause = direction === 'asc' ? asc(sortColumn) : desc(sortColumn);

    try {
        const result = await db.select().from(table).where(whereClause).orderBy(orderByClause);
        return {
            items: result.map((item: any) => ({ ...item, mainPhoto: item.photo1 })),
            search, sort, direction
        };
    } catch (e) {
        console.error("Database query failed:", e);
        return { items: [], search, sort, direction, error: 'Database connection failed.' };
    }
}