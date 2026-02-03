import { fail, redirect } from '@sveltejs/kit';
import { QUESTIONS } from '$lib/data/quiz';
import { user as userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


export const actions = {
	default: async ({ request, locals }) => {
		const db = locals.db;
		const currentUser = locals.user;
		if (!currentUser) throw redirect(302, '/login');

		const formData = await request.formData();
		
		// 1. Map session scores: { 'heart': [4, 3], 'brain': [2, 1]... }
		const sessionScores: Record<string, number[]> = {};
		
		QUESTIONS.forEach(q => {
			const val = parseInt(formData.get(`q-${q.id}`)?.toString() || '2');
			if (!sessionScores[q.type]) sessionScores[q.type] = [];
			sessionScores[q.type].push(val);
		});

		const types = ['heart', 'brain', 'body', 'luna', 'mercury', 'saturn', 'apollo', 'jupiter', 'venus', 'mars'];
		const updateData: Record<string, any> = {
			dateModified: new Date().toISOString()
		};

		types.forEach(type => {
			// Current Quiz Average (avg of the 2 questions for this type)
			const sessionAvg = (sessionScores[type][0] + sessionScores[type][1]) / 2;
			
			// Previous DB Average
			const previousValue = currentUser[type as keyof typeof currentUser];

			if (previousValue === null || previousValue === undefined) {
				updateData[type] = sessionAvg;
			} else {
				// The "Merging" Formula: Average of existing and new
				updateData[type] = (Number(previousValue) + sessionAvg) / 2;
			}
		});

		try {
			await db.update(userTable)
				.set(updateData)
				.where(eq(userTable.id, currentUser.id));
			
			return { success: true };
		} catch (e) {
			console.error(e);
			return fail(500, { message: "Database update failed." });
		}
	}
};