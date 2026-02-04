import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db';
import { transactions, user as userTable } from '$lib/server/db/schema';
import { eq, or, and, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, platform }) => {
    if (!locals.user) throw redirect(302, '/login');
    const userId = locals.user.id;
    const db = getDb(platform?.env);

    // 1. Fetch all transactions involving user
    const userTx = await db.select().from(transactions).where(
        or(eq(transactions.giverId, userId), eq(transactions.getterId, userId))
    );

    // 2. Compute Totals Helper
    const sumPoints = (txs: any[], kind: string, isGiver: boolean) => 
        txs.filter(t => t.kind === kind && (isGiver ? t.giverId === userId : t.getterId === userId))
           .reduce((sum, t) => sum + (t.points || 0), 0);

    const stats = {
        exchange: { giver: sumPoints(userTx, 'exchange', true), getter: sumPoints(userTx, 'exchange', false) },
        donation: { giver: sumPoints(userTx, 'donation', true), getter: sumPoints(userTx, 'donation', false) },
        transfer: { giver: sumPoints(userTx, 'transfer', true), getter: sumPoints(userTx, 'transfer', false) }
    };

    // 3. Find Top Partners (who gave most to user vs who got most from user)
    const getTopPartner = async (kind: string, asGiver: boolean) => {
        const partnerIdCol = asGiver ? transactions.getterId : transactions.giverId;
        const selfIdCol = asGiver ? transactions.giverId : transactions.getterId;

        const result = await db.select({
            partnerId: partnerIdCol,
            total: sql<number>`sum(${transactions.points})`,
            username: userTable.username,
            avatar: userTable.avatar,
            slug: userTable.slug
        })
        .from(transactions)
        .leftJoin(userTable, eq(partnerIdCol, userTable.id))
        .where(and(eq(transactions.kind, kind), eq(selfIdCol, userId)))
        .groupBy(partnerIdCol)
        .orderBy(sql`sum(${transactions.points}) DESC`)
        .limit(1);

        return result[0] || null;
    };

    return {
        stats,
        transactions: userTx.map(t => ({ ...t, isGiver: t.giverId === userId })),
        topPartners: {
            exchange: { biggestGetter: await getTopPartner('exchange', true), biggestGiver: await getTopPartner('exchange', false) },
            donation: { biggestGetter: await getTopPartner('donation', true), biggestGiver: await getTopPartner('donation', false) },
            transfer: { biggestGetter: await getTopPartner('transfer', true), biggestGiver: await getTopPartner('transfer', false) }
        }
    };
};