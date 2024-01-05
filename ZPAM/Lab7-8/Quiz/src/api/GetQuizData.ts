import { shuffle } from 'lodash';
import { fetch as netFetch } from "@react-native-community/netinfo";
import { SingleQuiz, Result, QuizSummary } from '../types/QuizType';

import { allQuizDataModel } from '../database/model/dbModel';
import { getQuizSummaryFromDB, getTestFromDB, saveQuizDataToDB } from '../database/service/dbSerivce';

async function getData<Union = SingleQuiz | Result | QuizSummary>(endpoint: string) {
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
    let data = {} as SingleQuiz;

    await netFetch().then(async state => {
        if (state.isConnected) {
            data = await getData<SingleQuiz>('https://tgryl.pl/quiz/test/' + id);
        }
        else {
            data = await getTestFromDB(id);
        }
    });
    data.tasks = shuffle(data.tasks);
    return data;
}

export async function getEveryTestDesc(): Promise<QuizSummary[]> {
    let data: QuizSummary[] = [];
    await netFetch().then(async state => {
        if (state.isConnected) {
            data = await getData<QuizSummary[]>('https://tgryl.pl/quiz/tests');
        }
        else {
            data = await getQuizSummaryFromDB();
        }
    });

    return data;
}

export async function getEveryResult(last = 20): Promise<Result[]> {
    let result: Result[] = [];

    await netFetch().then(async state => {
        if (state.isConnected) {
            result = await getData<Result[]>('https://tgryl.pl/quiz/results?last=' + last);
        }
    })
    return result;
}

export async function feedDBWithQuizData() {
    const data = await getData<QuizSummary[]>('https://tgryl.pl/quiz/tests');

    const allDataDB: allQuizDataModel[] = [];
    const promises = data.map(async singleSummary => {
        const test = await getTest(singleSummary.id);
        allDataDB.push({ ...singleSummary, tasks: test.tasks });
    });


    await Promise.all(promises);

    saveQuizDataToDB(allDataDB);
}