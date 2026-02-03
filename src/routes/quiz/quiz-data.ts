export enum QuestionGroup {
	Heart = 'heart',
	Mind = 'brain',
	Body = 'body',
	Luna = 'luna',
	Saturn = 'saturn',
	Mercury = 'mercury',
	Apollo = 'apollo',
	Jupiter = 'jupiter',
	Venus = 'venus',
	Mars = 'mars'
}

export enum QuestionType {
	Positive = 'Positive',
	Negative = 'Negative'
}

export interface Question {
	text: string;
	group: QuestionGroup;
	type: QuestionType;
}

// All questions - 10 questions per group (5 positive, 5 negative)
export const allQuestions: Question[] = [
	// --- Heart ---
	{
		text: "I easily connect with others' feelings.",
		group: QuestionGroup.Heart,
		type: QuestionType.Positive
	},
	{
		text: 'I find it rewarding to help others.',
		group: QuestionGroup.Heart,
		type: QuestionType.Positive
	},
	{
		text: 'I am empathetic and compassionate.',
		group: QuestionGroup.Heart,
		type: QuestionType.Positive
	},
	{
		text: 'I care deeply about the wellbeing of others.',
		group: QuestionGroup.Heart,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy making others feel valued and appreciated.',
		group: QuestionGroup.Heart,
		type: QuestionType.Positive
	},
	{
		text: 'I often feel emotionally detached.',
		group: QuestionGroup.Heart,
		type: QuestionType.Negative
	},
	{
		text: "Other people's problems don't usually affect me.",
		group: QuestionGroup.Heart,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to understand what others are feeling.',
		group: QuestionGroup.Heart,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer to keep emotional distance from people.',
		group: QuestionGroup.Heart,
		type: QuestionType.Negative
	},
	{
		text: "I rarely think about others' emotional needs.",
		group: QuestionGroup.Heart,
		type: QuestionType.Negative
	},

	// --- Mind (Brain) ---
	{
		text: 'I enjoy learning new things.',
		group: QuestionGroup.Mind,
		type: QuestionType.Positive
	},
	{
		text: 'I am curious about how things work.',
		group: QuestionGroup.Mind,
		type: QuestionType.Positive
	},
	{
		text: 'I like to analyze and understand complex ideas.',
		group: QuestionGroup.Mind,
		type: QuestionType.Positive
	},
	{
		text: 'I seek out intellectual challenges.',
		group: QuestionGroup.Mind,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy deep conversations about ideas.',
		group: QuestionGroup.Mind,
		type: QuestionType.Positive
	},
	{
		text: 'I dislike complex thinking.',
		group: QuestionGroup.Mind,
		type: QuestionType.Negative
	},
	{
		text: 'I tend to stick to what I already know.',
		group: QuestionGroup.Mind,
		type: QuestionType.Negative
	},
	{
		text: 'Learning new things feels like a chore to me.',
		group: QuestionGroup.Mind,
		type: QuestionType.Negative
	},
	{
		text: 'I avoid situations that require deep thinking.',
		group: QuestionGroup.Mind,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer simple, straightforward information.',
		group: QuestionGroup.Mind,
		type: QuestionType.Negative
	},

	// --- Body ---
	{
		text: 'I feel energetic most days.',
		group: QuestionGroup.Body,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy physical activity.',
		group: QuestionGroup.Body,
		type: QuestionType.Positive
	},
	{
		text: 'I prioritize my physical health.',
		group: QuestionGroup.Body,
		type: QuestionType.Positive
	},
	{
		text: 'I feel strong and capable in my body.',
		group: QuestionGroup.Body,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy moving and being active.',
		group: QuestionGroup.Body,
		type: QuestionType.Positive
	},
	{
		text: 'I often feel tired or sluggish.',
		group: QuestionGroup.Body,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer sedentary activities.',
		group: QuestionGroup.Body,
		type: QuestionType.Negative
	},
	{
		text: 'I neglect my physical wellbeing.',
		group: QuestionGroup.Body,
		type: QuestionType.Negative
	},
	{
		text: 'I avoid physical exertion whenever possible.',
		group: QuestionGroup.Body,
		type: QuestionType.Negative
	},
	{
		text: 'I rarely feel physically energized.',
		group: QuestionGroup.Body,
		type: QuestionType.Negative
	},

	// --- Luna ---
	{
		text: 'I trust my intuition.',
		group: QuestionGroup.Luna,
		type: QuestionType.Positive
	},
	{
		text: 'I pay attention to my dreams and inner visions.',
		group: QuestionGroup.Luna,
		type: QuestionType.Positive
	},
	{
		text: 'I am in touch with my subconscious mind.',
		group: QuestionGroup.Luna,
		type: QuestionType.Positive
	},
	{
		text: 'I value my inner emotional world.',
		group: QuestionGroup.Luna,
		type: QuestionType.Positive
	},
	{
		text: 'I am comfortable with uncertainty and mystery.',
		group: QuestionGroup.Luna,
		type: QuestionType.Positive
	},
	{
		text: 'I tend to ignore my gut feelings.',
		group: QuestionGroup.Luna,
		type: QuestionType.Negative
	},
	{
		text: 'I dismiss things I cannot logically explain.',
		group: QuestionGroup.Luna,
		type: QuestionType.Negative
	},
	{
		text: 'I rarely reflect on my inner experiences.',
		group: QuestionGroup.Luna,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer concrete facts over intuitive insights.',
		group: QuestionGroup.Luna,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to access my deeper feelings.',
		group: QuestionGroup.Luna,
		type: QuestionType.Negative
	},

	// --- Saturn ---
	{
		text: 'I am disciplined and organized.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Positive
	},
	{
		text: 'I follow through on my commitments.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Positive
	},
	{
		text: 'I value structure and order in my life.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Positive
	},
	{
		text: 'I am responsible and reliable.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Positive
	},
	{
		text: 'I work hard to achieve my goals.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Positive
	},
	{
		text: 'I often procrastinate on important tasks.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Negative
	},
	{
		text: 'I struggle to maintain discipline.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Negative
	},
	{
		text: 'I frequently miss deadlines.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to stick to routines.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Negative
	},
	{
		text: 'I avoid taking on responsibilities.',
		group: QuestionGroup.Saturn,
		type: QuestionType.Negative
	},

	// --- Mercury ---
	{
		text: 'I like mathematics and problem solving.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Positive
	},
	{
		text: 'I communicate my ideas clearly and effectively.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy intellectual discussions and debates.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Positive
	},
	{
		text: 'I am quick to understand new concepts.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Positive
	},
	{
		text: 'I excel at logical reasoning.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Positive
	},
	{
		text: 'Communicating my ideas clearly is difficult for me.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Negative
	},
	{
		text: 'I struggle with analytical thinking.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to articulate my thoughts.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Negative
	},
	{
		text: 'I avoid logical or mathematical challenges.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer not to engage in intellectual debates.',
		group: QuestionGroup.Mercury,
		type: QuestionType.Negative
	},

	// --- Apollo ---
	{
		text: 'I appreciate art and beauty.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy creative expression.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Positive
	},
	{
		text: 'I am drawn to aesthetic experiences.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Positive
	},
	{
		text: 'I find inspiration in beautiful things.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Positive
	},
	{
		text: 'I value artistic pursuits.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Positive
	},
	{
		text: 'I rarely notice the aesthetic details around me.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Negative
	},
	{
		text: 'Art and beauty do not interest me much.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Negative
	},
	{
		text: 'I find creative activities pointless.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Negative
	},
	{
		text: 'I am indifferent to aesthetics.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer practical things over beautiful things.',
		group: QuestionGroup.Apollo,
		type: QuestionType.Negative
	},

	// --- Jupiter ---
	{
		text: 'I am generally optimistic about the future.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Positive
	},
	{
		text: 'I see opportunities where others see obstacles.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Positive
	},
	{
		text: 'I believe in abundance and possibility.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Positive
	},
	{
		text: 'I maintain a positive outlook even in challenges.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Positive
	},
	{
		text: 'I am hopeful about what lies ahead.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Positive
	},
	{
		text: 'I often expect the worst to happen.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Negative
	},
	{
		text: 'I tend to focus on limitations rather than possibilities.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Negative
	},
	{
		text: 'I struggle to see the bright side of situations.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Negative
	},
	{
		text: 'I am pessimistic about the future.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to maintain hope.',
		group: QuestionGroup.Jupiter,
		type: QuestionType.Negative
	},

	// --- Venus ---
	{
		text: 'I value harmony in my relationships.',
		group: QuestionGroup.Venus,
		type: QuestionType.Positive
	},
	{
		text: 'I am affectionate and loving.',
		group: QuestionGroup.Venus,
		type: QuestionType.Positive
	},
	{
		text: 'I enjoy creating peace and connection with others.',
		group: QuestionGroup.Venus,
		type: QuestionType.Positive
	},
	{
		text: 'I appreciate beauty in relationships.',
		group: QuestionGroup.Venus,
		type: QuestionType.Positive
	},
	{
		text: 'I am warm and welcoming to people.',
		group: QuestionGroup.Venus,
		type: QuestionType.Positive
	},
	{
		text: 'I sometimes enjoy creating conflict.',
		group: QuestionGroup.Venus,
		type: QuestionType.Negative
	},
	{
		text: 'I am indifferent to harmony in relationships.',
		group: QuestionGroup.Venus,
		type: QuestionType.Negative
	},
	{
		text: 'I struggle to express affection.',
		group: QuestionGroup.Venus,
		type: QuestionType.Negative
	},
	{
		text: 'I prefer distance over closeness in relationships.',
		group: QuestionGroup.Venus,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to be warm and welcoming.',
		group: QuestionGroup.Venus,
		type: QuestionType.Negative
	},

	// --- Mars ---
	{
		text: 'I am assertive and stand up for myself.',
		group: QuestionGroup.Mars,
		type: QuestionType.Positive
	},
	{
		text: 'I take initiative and pursue my goals actively.',
		group: QuestionGroup.Mars,
		type: QuestionType.Positive
	},
	{
		text: 'I am confident in expressing my needs.',
		group: QuestionGroup.Mars,
		type: QuestionType.Positive
	},
	{
		text: 'I am courageous and willing to take risks.',
		group: QuestionGroup.Mars,
		type: QuestionType.Positive
	},
	{
		text: 'I have strong willpower and determination.',
		group: QuestionGroup.Mars,
		type: QuestionType.Positive
	},
	{
		text: 'I avoid confrontation at all costs.',
		group: QuestionGroup.Mars,
		type: QuestionType.Negative
	},
	{
		text: 'I struggle to assert myself.',
		group: QuestionGroup.Mars,
		type: QuestionType.Negative
	},
	{
		text: 'I am passive and let others take the lead.',
		group: QuestionGroup.Mars,
		type: QuestionType.Negative
	},
	{
		text: 'I find it hard to pursue what I want.',
		group: QuestionGroup.Mars,
		type: QuestionType.Negative
	},
	{
		text: 'I lack the courage to take bold action.',
		group: QuestionGroup.Mars,
		type: QuestionType.Negative
	}
];

// Helper function to select 20 quiz questions (2 per group: 1 positive, 1 negative)
export function selectQuizQuestions(): Question[] {
	const selected: Question[] = [];

	for (const group of Object.values(QuestionGroup)) {
		// Get positive questions for the group
		const positiveGroupQuestions = allQuestions.filter(
			(q) => q.group === group && q.type === QuestionType.Positive
		);

		if (positiveGroupQuestions.length > 0) {
			const randomIndex = Math.floor(Math.random() * positiveGroupQuestions.length);
			selected.push(positiveGroupQuestions[randomIndex]);
		} else {
			console.warn(`Warning: Not enough positive questions for group ${group}`);
		}

		// Get negative questions for the group
		const negativeGroupQuestions = allQuestions.filter(
			(q) => q.group === group && q.type === QuestionType.Negative
		);

		if (negativeGroupQuestions.length > 0) {
			const randomIndex = Math.floor(Math.random() * negativeGroupQuestions.length);
			selected.push(negativeGroupQuestions[randomIndex]);
		} else {
			console.warn(`Warning: Not enough negative questions for group ${group}`);
		}
	}

	// Shuffle the final list of 20 questions
	for (let i = selected.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[selected[i], selected[j]] = [selected[j], selected[i]];
	}

	return selected;
}
