// import { fail, redirect } from '@sveltejs/kit'; 
// import { QUESTIONS } from '$lib/data/quiz'; 
// import { user as userTable } from '$lib/server/db/schema'; 
// import { eq } from 'drizzle-orm';



// export const actions = {
//     default: async ({ request, locals, platform }) => {  // Add platform here
//         const currentUser = locals.user; 
//         if (!currentUser) throw redirect(302, '/login'); 
        
//         // Get db instance using getDb function
//         const { getDb } = await import('$lib/server/db');
//         const db = getDb(platform?.env);
        
//         const formData = await request.formData(); 
        
//         // 1. Map session scores: { 'heart': [4, 3], 'brain': [2, 1]... } 
//         const sessionScores: Record<string, number[]> = {}; 
//         QUESTIONS.forEach(q => {
//             const val = parseInt(formData.get(`q-${q.id}`)?.toString() || '2'); 
//             if (!sessionScores[q.type]) sessionScores[q.type] = []; 
//             sessionScores[q.type].push(val); 
//         }); 
        
//         const types = ['heart', 'brain', 'body', 'luna', 'mercury', 'saturn', 'apollo', 'jupiter', 'venus', 'mars']; 
//         const updateData: Record<string, any> = {dateModified: new Date().toISOString() }; 
        
//         types.forEach(type => {
//             // Current Quiz Average (avg of the 2 questions for this type) 
//             const sessionAvg = (sessionScores[type][0] + sessionScores[type][1]) / 2; 
//             // Previous DB Average 
//             const previousValue = currentUser[type as keyof typeof currentUser]; 
//             if (previousValue === null || previousValue === undefined) {
//                 updateData[type] = sessionAvg; 
//             } else {
//                 // The "Merging" Formula: Average of existing and new 
//                 updateData[type] = (Number(previousValue) + sessionAvg) / 2; 
//             } 
//         }); 
        
//         try {
//             await db.update(userTable) 
//                 .set(updateData) 
//                 .where(eq(userTable.id, currentUser.id)); 
//             return { success: true }; 
//         } catch (e) {
//             console.error(e); 
//             return fail(500, { message: "Database update failed." }); 
//         } 
//     } 
// };



import { fail, redirect } from '@sveltejs/kit';
import { QUESTIONS } from '$lib/data/quiz';
import { user as userTable, mounts, mountsmonth } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const actions = {
  default: async ({ request, locals, platform }) => {
    const currentUser = locals.user;
    if (!currentUser) throw redirect(302, '/login');

    // Get db instance
    const { getDb } = await import('$lib/server/db');
    const db = getDb(platform?.env);

    const formData = await request.formData();

    // 1. Map session scores: { 'heart': [4, 3], 'brain': [2, 1]... }
    const sessionScores: Record<string, number[]> = {};
    
    QUESTIONS.forEach(q => {
      const val = parseInt(formData.get(`q-${q.id}`)?.toString() || '2');
      if (!sessionScores[q.type]) sessionScores[q.type] = [];
      sessionScores[q.type].push(val);
    });

    const types = ['heart', 'brain', 'body', 'luna', 'mercury', 'saturn', 'apollo', 'jupiter', 'venus', 'mars'];

    // 2. Calculate session averages for each type
    const sessionAverages: Record<string, number> = {};
    types.forEach(type => {
      const scores = sessionScores[type] || [];
      sessionAverages[type] = scores.reduce((a, b) => a + b, 0) / scores.length;
    });

    try {
      // ==================================================================
      // STEP 1: Insert new entry into MOUNTS table
      // ==================================================================
      const mountId = nanoid();
      const now = new Date().toISOString();
      
      await db.insert(mounts).values({
        id: mountId,
        userId: currentUser.id,
        heart: sessionAverages.heart,
        brain: sessionAverages.brain,
        body: sessionAverages.body,
        luna: sessionAverages.luna,
        mercury: sessionAverages.mercury,
        saturn: sessionAverages.saturn,
        apollo: sessionAverages.apollo,
        jupiter: sessionAverages.jupiter,
        venus: sessionAverages.venus,
        mars: sessionAverages.mars,
        dateCreated: now
      });

      // ==================================================================
      // STEP 2: Calculate monthly average from MOUNTS and update MOUNTSMONTH
      // ==================================================================
      const currentMonth = now.substring(0, 7); // YYYY-MM format

      // Get all mounts for this user in the current month
      const monthlyMounts = await db
        .select()
        .from(mounts)
        .where(
          and(
            eq(mounts.userId, currentUser.id),
            sql`strftime('%Y-%m', ${mounts.dateCreated}) = ${currentMonth}`
          )
        );

      // Calculate averages for the month
      const monthlyAverages: Record<string, number> = {};
      types.forEach(type => {
        const values = monthlyMounts.map(m => m[type as keyof typeof m] as number).filter(v => v !== null);
        monthlyAverages[type] = values.length > 0 
          ? values.reduce((a, b) => a + b, 0) / values.length 
          : 0;
      });

      // Check if mountsmonth entry exists for this user and month
      const existingMonthEntry = await db
        .select()
        .from(mountsmonth)
        .where(
          and(
            eq(mountsmonth.userId, currentUser.id),
            sql`strftime('%Y-%m', ${mountsmonth.dateCreated}) = ${currentMonth}`
          )
        )
        .limit(1);

      if (existingMonthEntry.length > 0) {
        // Update existing month entry
        await db
          .update(mountsmonth)
          .set({
            heart: monthlyAverages.heart,
            brain: monthlyAverages.brain,
            body: monthlyAverages.body,
            luna: monthlyAverages.luna,
            mercury: monthlyAverages.mercury,
            saturn: monthlyAverages.saturn,
            apollo: monthlyAverages.apollo,
            jupiter: monthlyAverages.jupiter,
            venus: monthlyAverages.venus,
            mars: monthlyAverages.mars,
            dateModified: now
          })
          .where(eq(mountsmonth.id, existingMonthEntry[0].id));
      } else {
        // Create new month entry
        await db.insert(mountsmonth).values({
          id: nanoid(),
          userId: currentUser.id,
          heart: monthlyAverages.heart,
          brain: monthlyAverages.brain,
          body: monthlyAverages.body,
          luna: monthlyAverages.luna,
          mercury: monthlyAverages.mercury,
          saturn: monthlyAverages.saturn,
          apollo: monthlyAverages.apollo,
          jupiter: monthlyAverages.jupiter,
          venus: monthlyAverages.venus,
          mars: monthlyAverages.mars,
          dateCreated: now,
          dateModified: now
        });
      }

      // ==================================================================
      // STEP 3: Calculate overall average from MOUNTSMONTH and update USER
      // ==================================================================
      
      // Get all monthly averages for this user
      const allMonthlyAverages = await db
        .select()
        .from(mountsmonth)
        .where(eq(mountsmonth.userId, currentUser.id));

      // Calculate overall averages
      const overallAverages: Record<string, number> = {};
      types.forEach(type => {
        const values = allMonthlyAverages
          .map(m => m[type as keyof typeof m] as number)
          .filter(v => v !== null && v !== undefined);
        
        overallAverages[type] = values.length > 0 
          ? values.reduce((a, b) => a + b, 0) / values.length 
          : 0;
      });

      // Update user table with overall averages
      await db
        .update(userTable)
        .set({
          heart: overallAverages.heart,
          brain: overallAverages.brain,
          body: overallAverages.body,
          luna: overallAverages.luna,
          mercury: overallAverages.mercury,
          saturn: overallAverages.saturn,
          apollo: overallAverages.apollo,
          jupiter: overallAverages.jupiter,
          venus: overallAverages.venus,
          mars: overallAverages.mars,
          dateModified: now
        })
        .where(eq(userTable.id, currentUser.id));

      return { success: true };
    } catch (e) {
      console.error('Quiz submission error:', e);
      return fail(500, { message: "Database update failed." });
    }
  }
};


// /**
//  * Get user's quiz history with monthly breakdowns
//  */
// export async function getUserQuizHistory(db: any, userId: string) {
//   // Get all individual quiz entries
//   const allMounts = await db
//     .select()
//     .from(mounts)
//     .where(eq(mounts.userId, userId))
//     .orderBy(sql`${mounts.dateCreated} DESC`);

//   // Get monthly averages
//   const monthlyData = await db
//     .select()
//     .from(mountsmonth)
//     .where(eq(mountsmonth.userId, userId))
//     .orderBy(sql`${mountsmonth.dateCreated} DESC`);

//   // Get current user overall averages
//   const userData = await db
//     .select()
//     .from(userTable)
//     .where(eq(userTable.id, userId))
//     .limit(1);

//   return {
//     individual: allMounts,
//     monthly: monthlyData,
//     overall: userData[0] || null
//   };
// }

// /**
//  * Get quiz statistics for a user
//  */
// export async function getQuizStats(db: any, userId: string) {
//   const mounts = await db
//     .select({
//       count: sql<number>`count(*)`,
//       firstQuiz: sql<string>`min(date_created)`,
//       lastQuiz: sql<string>`max(date_created)`
//     })
//     .from(mounts)
//     .where(eq(mounts.userId, userId));

//   const monthlyCount = await db
//     .select({
//       count: sql<number>`count(*)`
//     })
//     .from(mountsmonth)
//     .where(eq(mountsmonth.userId, userId));

//   return {
//     totalQuizzes: mounts[0]?.count || 0,
//     firstQuizDate: mounts[0]?.firstQuiz || null,
//     lastQuizDate: mounts[0]?.lastQuiz || null,
//     monthsTracked: monthlyCount[0]?.count || 0
//   };
// }

