import { QuizSummary } from "../../types/QuizType";

export type DrawerNavParamList = {
    Home: { quizSummary: QuizSummary[] },
    Quiz: { pickedQuizID: string, quizType: string, quizSummary: QuizSummary[] },
    Results: undefined
};
