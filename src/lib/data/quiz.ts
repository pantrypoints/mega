// $lib/data/quiz.ts
export type QuizType = 'heart' | 'brain' | 'body' | 'luna' | 'mercury' | 'saturn' | 'apollo' | 'jupiter' | 'venus' | 'mars';

// Use message keys instead of hardcoded text
export const QUESTIONS = [
  { id: 1, type: 'heart', textKey: 'quiz_q1' },
  { id: 2, type: 'heart', textKey: 'quiz_q2' },
  { id: 3, type: 'brain', textKey: 'quiz_q3' },
  { id: 4, type: 'brain', textKey: 'quiz_q4' },
  { id: 5, type: 'body', textKey: 'quiz_q5' },
  { id: 6, type: 'body', textKey: 'quiz_q6' },
  { id: 7, type: 'luna', textKey: 'quiz_q7' },
  { id: 8, type: 'luna', textKey: 'quiz_q8' },
  { id: 9, type: 'mercury', textKey: 'quiz_q9' },
  { id: 10, type: 'mercury', textKey: 'quiz_q10' },
  { id: 11, type: 'saturn', textKey: 'quiz_q11' },
  { id: 12, type: 'saturn', textKey: 'quiz_q12' },
  { id: 13, type: 'apollo', textKey: 'quiz_q13' },
  { id: 14, type: 'apollo', textKey: 'quiz_q14' },
  { id: 15, type: 'jupiter', textKey: 'quiz_q15' },
  { id: 16, type: 'jupiter', textKey: 'quiz_q16' },
  { id: 17, type: 'venus', textKey: 'quiz_q17' },
  { id: 18, type: 'venus', textKey: 'quiz_q18' },
  { id: 19, type: 'mars', textKey: 'quiz_q19' },
  { id: 20, type: 'mars', textKey: 'quiz_q20' }
];

// Option labels using message keys
export const OPTIONS = [
    { labelKey: 'quiz_strongly_agree', value: 4 },
    { labelKey: 'quiz_agree', value: 3 },
    { labelKey: 'quiz_neutral', value: 2 },
    { labelKey: 'quiz_disagree', value: 1 },
    { labelKey: 'quiz_strongly_disagree', value: 0 },
];
