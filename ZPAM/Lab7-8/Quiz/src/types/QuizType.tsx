export type Quiz = {
    name: string,
    tasks: Task[],
};

export type Task = {
    question: string,
    answers: Answer[],
    duration: number
};

export type Answer = {
    content: string,
    isCorrect: boolean,
};

export type Result = {
    nick: string,
    score: number,
    total: number,
    type: string,
    createdOn: string,
}