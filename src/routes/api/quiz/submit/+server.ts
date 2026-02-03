import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

interface QuizScores {
	heart: number;
	brain: number;
	body: number;
	luna: number;
	saturn: number;
	mercury: number;
	apollo: number;
	jupiter: number;
	venus: number;
	mars: number;
}

interface LastQuizAttempt {
	timestamp: number;
	scores: QuizScores;
}

// Store last quiz attempts in memory (in production, use Redis or database)
const lastQuizAttempts = new Map<string, LastQuizAttempt>();

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		// Check if user is authenticated
		const session = locals.session;
		if (!session || !session.userId) {
			return json({ error: 'Unauthorized' }, { status: 401 });
		}

		const userId = session.userId;
		const { scores } = await request.json();

		// Rate limiting: Check if user took quiz in the last hour
		const now = Date.now();
		const lastAttempt = lastQuizAttempts.get(userId);

		if (lastAttempt) {
			const hourInMs = 60 * 60 * 1000;
			const timeSinceLastAttempt = now - lastAttempt.timestamp;

			if (timeSinceLastAttempt < hourInMs) {
				const remainingMinutes = Math.ceil((hourInMs - timeSinceLastAttempt) / (60 * 1000));
				return json(
					{
						error: 'RATE_LIMIT',
						message: 'You can only take the quiz once per hour',
						remainingMinutes
					},
					{ status: 429 }
				);
			}
		}

		// Get current user data
		const [currentUser] = await db.select().from(user).where(eq(user.id, userId)).limit(1);

		if (!currentUser) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		// Calculate new scores (average with existing scores if they exist)
		const newScores: Partial<QuizScores> = {};
		const scoreFields: (keyof QuizScores)[] = [
			'heart',
			'brain',
			'body',
			'luna',
			'saturn',
			'mercury',
			'apollo',
			'jupiter',
			'venus',
			'mars'
		];

		for (const field of scoreFields) {
			const newScore = scores[field] ?? 0;
			const existingScore = currentUser[field];

			if (existingScore === null || existingScore === undefined) {
				// First time taking quiz, use new score directly
				newScores[field] = newScore;
			} else {
				// Average the scores: (existing + new) / 2
				newScores[field] = (existingScore + newScore) / 2;
			}
		}

		// Update user in database
		await db
			.update(user)
			.set({
				...newScores,
				dateModified: new Date().toISOString()
			})
			.where(eq(user.id, userId));

		// Store this attempt for rate limiting
		lastQuizAttempts.set(userId, {
			timestamp: now,
			scores: scores
		});

		return json({
			success: true,
			scores: newScores,
			message: 'Quiz results saved successfully'
		});
	} catch (error) {
		console.error('Error saving quiz results:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
