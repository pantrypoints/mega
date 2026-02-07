import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { user, products, services, wishes, requests, transactions } from '$lib/server/db/schema';
import { count, sql, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
    const db = getDb(platform?.env);

    // 1. User Stats: Total and 6-Month Trend
    const totalUsers = await db.select({ value: count() }).from(user);
    const userTrend = await db.select({
        count: count(),
        month: sql<string>`strftime('%Y-%m', ${user.dateCreated})`
    })
    .from(user)
    .groupBy(sql`strftime('%Y-%m', ${user.dateCreated})`)
    .orderBy(desc(sql`strftime('%Y-%m', ${user.dateCreated})`))
    .limit(6);

    // 2. Item Stats: Counts and Top Categories
    const [pCount, sCount, wCount, rCount] = await Promise.all([
        db.select({ value: count() }).from(products),
        db.select({ value: count() }).from(services),
        db.select({ value: count() }).from(wishes),
        db.select({ value: count() }).from(requests)
    ]);

    const topProductCats = await db.select({ category: products.category, count: count() })
        .from(products).groupBy(products.category).orderBy(desc(count())).limit(3);

    const topServiceCats = await db.select({ category: services.category, count: count() })
        .from(services).groupBy(services.category).orderBy(desc(count())).limit(3);

    // 3. Points Stats: Totals and Kind Breakdown
    const pointsStats = await db.select({
        kind: transactions.kind,
        total: sql<number>`sum(${transactions.points})`,
        txCount: count()
    }).from(transactions).groupBy(transactions.kind);

    const grandTotalPoints = await db.select({ sum: sql<number>`sum(${transactions.points})` }).from(transactions);

    return {
        userStats: {
            total: totalUsers[0].value,
            trend: userTrend.reverse().map(d => d.count)
        },
        itemStats: {
            counts: { 
                products: pCount[0].value, 
                services: sCount[0].value, 
                wishes: wCount[0].value, 
                requests: rCount[0].value 
            },
            topProducts: topProductCats,
            topServices: topServiceCats
        },
        pointStats: {
            total: grandTotalPoints[0].sum || 0,
            breakdown: pointsStats
        }
    };
};