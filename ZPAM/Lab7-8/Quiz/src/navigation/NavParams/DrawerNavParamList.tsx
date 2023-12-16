import { QuizDesc } from "../../types/QuizType";

export type DrawerNavParamList = {
    Home: { quizDesc: QuizDesc[] },
    Quiz: { pickedQuizID: string, quizType: string, quizDesc: QuizDesc[] },
    Results: undefined
};
