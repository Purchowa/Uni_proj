import { Task } from "../../types/QuizType";

export type allQuizDataModel = {
    id: string,
    name: string,
    description: string,
    tags: string[],
    level: string,
    numberOfTasks: number
    tasks: Task[],
}