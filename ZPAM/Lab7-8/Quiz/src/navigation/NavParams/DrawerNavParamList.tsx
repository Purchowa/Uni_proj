import { QuizDesc } from "../../types/QuizType";

export type DrawerNavParamList = {
    Home: { quizDesc: QuizDesc[] },
    Quiz: { pickedQuizID: string, quizIDs: string[] },
    Results: undefined
};
