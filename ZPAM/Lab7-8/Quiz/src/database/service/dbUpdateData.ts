import { SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";
import { getDBConnection } from './dbSerivce';
import { feedDBWithQuizData } from "../../api/GetQuizData";

enablePromise(true);

const tableName = 'quizUpdate';

async function createTable(db: SQLiteDatabase) {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (lastUpdateDate VARCHAR(24) NOT NULL PRIMARY KEY);`;

    await db.transaction(tx => {
        tx.executeSql(query)
    });
}

export async function updateHistoricQuizData(currentDate: string) {
    const db = await getDBConnection();
    await createTable(db);

    const historicDate: string | undefined = (await db.executeSql(`SELECT lastUpdateDate FROM ${tableName}`)).at(0)?.rows.item(0).lastUpdateDate;

    if (historicDate === undefined) {
        console.log('Insert new date');
        await db.executeSql(`INSERT INTO ${tableName} (lastUpdateDate) VALUES(?)`, [currentDate]);
    }
    else if (historicDate !== currentDate) {
        console.log('Update date');
        await feedDBWithQuizData();
        await db.executeSql(`UPDATE ${tableName} SET lastUpdateDate = ? WHERE lastUpdateDate = ?`, [currentDate, historicDate]);
    }
    console.log('Do not update');
}
