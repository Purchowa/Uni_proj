import { Quiz, Result, QuizDesc } from '../types/QuizType';

async function getData<Union = Quiz | Result | QuizDesc>(endpoint: string) {
    let jsonResponse = {} as Union;
    try {
        const response = await fetch(endpoint);
        jsonResponse = await response.json();
    }
    catch (error) {
        console.error(error);
    }
    finally {
        return jsonResponse;
    }
}

export async function getTest(id: string) {
    return await getData<Quiz>('https://tgryl.pl/quiz/test/' + id);
}

export async function getEveryTestDesc() {
    return await getData<QuizDesc[]>('https://tgryl.pl/quiz/tests');
}

export async function getEveryResult(last = 20) {
    return await getData<Result[]>('https://tgryl.pl/quiz/results?last=' + last);
}