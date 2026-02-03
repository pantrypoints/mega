// export type QuizType = 'heart' | 'brain' | 'body' | 'luna' | 'mercury' | 'saturn' | 'apollo' | 'jupiter' | 'venus' | 'mars';

// export const QUESTIONS = [
// 	{ id: 1, type: 'heart', text: "I often follow my emotions rather than logic." },
// 	{ id: 2, type: 'heart', text: "Connecting with others on a deep level is a priority for me." },
// 	{ id: 20, type: 'mars', text: "I have a high drive to compete and win." }
// ];


export type QuizType = 'heart' | 'brain' | 'body' | 'luna' | 'mercury' | 'saturn' | 'apollo' | 'jupiter' | 'venus' | 'mars';

export const QUESTIONS = [
	{ id: 1, type: 'heart', text: "I often follow my emotions rather than logic." },
	{ id: 2, type: 'heart', text: "Connecting with others on a deep level is a priority for me." },
	{ id: 3, type: 'brain', text: "I enjoy solving complex analytical puzzles." },
	{ id: 4, type: 'brain', text: "I value objective facts over personal opinions." },
	{ id: 5, type: 'body', text: "Physical activity is essential for my mental clarity." },
	{ id: 6, type: 'body', text: "I am very in tune with my physical sensations." },
	{ id: 7, type: 'luna', text: "I find myself influenced by the changing cycles of nature." },
	{ id: 8, type: 'luna', text: "I have a very active dream life and intuition." },
	{ id: 9, type: 'mercury', text: "I am a quick learner and adapt fast to new information." },
	{ id: 10, type: 'mercury', text: "Effective communication is my strongest asset." },
	{ id: 11, type: 'saturn', text: "I prefer structure and long-term discipline over spontaneity." },
	{ id: 12, type: 'saturn', text: "I take my responsibilities very seriously." },
	{ id: 13, type: 'apollo', text: "I strive for excellence and recognition in my creative work." },
	{ id: 14, type: 'apollo', text: "I feel most alive when I am expressing my unique talents." },
	{ id: 15, type: 'jupiter', text: "I am naturally optimistic about the future." },
	{ id: 16, type: 'jupiter', text: "I seek constant growth and expansion in my life." },
	{ id: 17, type: 'venus', text: "Aesthetics and beauty are vital to my surroundings." },
	{ id: 18, type: 'venus', text: "Harmony in relationships is worth making sacrifices for." },
	{ id: 19, type: 'mars', text: "I am comfortable with confrontation if it leads to results." },
	{ id: 20, type: 'mars', text: "I have a high drive to compete and win." }
];


export const OPTIONS = [
    { label: 'Strongly Agree', value: 4 },
    { label: 'Agree', value: 3 },
    { label: 'Neutral', value: 2 },
    { label: 'Disagree', value: 1 },
    { label: 'Strongly Disagree', value: 0 },
];