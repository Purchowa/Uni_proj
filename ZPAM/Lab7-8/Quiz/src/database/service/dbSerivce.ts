import { SQLiteDatabase, openDatabase, enablePromise } from "react-native-sqlite-storage";
import { allQuizDataModel } from "../model/dbModel";
import { QuizSummary, SingleQuiz } from "../../types/QuizType";
import { zip, flattenDeep } from "lodash";

enablePromise(true);

const tableName = 'quizNew_2';

export async function getDBConnection() {
    return openDatabase({ name: 'quizData.db', location: 'default' }, () => console.log('db opened'), error => console.error(error));
}

async function createTable(db: SQLiteDatabase) {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id VARCHAR(50) NOT NULL PRIMARY KEY, data TEXT NOT NULL);`;

    await db.executeSql(query);
}

async function saveAllQuizData(db: SQLiteDatabase, data: allQuizDataModel[]) {
    const insert = `INSERT OR REPLACE INTO ${tableName} (id, data) VALUES ` + data.map(_ => '(?, ?)').join(',');
    try {
        return await db.executeSql(insert, flattenDeep(zip(data.map(el => el.id), data.map(el => JSON.stringify(el)))));
    }
    catch (error) {
        console.error(error);
    }
}

async function getAllQuizData(db: SQLiteDatabase): Promise<allQuizDataModel[]> {
    const data: allQuizDataModel[] = [];
    try {
        const get = `SELECT * FROM ${tableName}`;
        const results = await db.executeSql(get);

        results.forEach(result => {
            for (let i = 0; i < result.rows.length; i++) {
                data.push(JSON.parse(result.rows.item(i).data));
            }
        })
    }
    catch (error) {
        console.error(error);
    }
    return data;
}

async function getQuizData(id: string, db: SQLiteDatabase): Promise<allQuizDataModel> {
    let data = {} as allQuizDataModel;

    try {
        const get = `SELECT * FROM ${tableName} WHERE id = ?`;
        const result = (await db.executeSql(get, [id]))[0];
        data = JSON.parse(result.rows.item(0).data);
    }
    catch (error) {
        console.error(error);
    }
    return data;
}

export async function saveQuizDataToDB(data: allQuizDataModel[]) {
    const db = await getDBConnection();
    await createTable(db);

    saveAllQuizData(db, data);
}

export async function getQuizSummaryFromDB() {

    const db = await getDBConnection();
    await createTable(db);

    const quizDB = await getAllQuizData(db);
    const quizSummary: QuizSummary[] = [];

    quizDB.forEach(model => {
        quizSummary.push({ id: model.id, description: model.description, level: model.level, name: model.name, numberOfTasks: model.numberOfTasks, tags: model.tags });
    });
    return quizSummary;
}

export async function getTestFromDB(id: string): Promise<SingleQuiz> {
    const db = await getDBConnection();
    await createTable(db);

    const quizDB = await getQuizData(id, db);

    return { name: quizDB.name, tasks: quizDB.tasks };
}