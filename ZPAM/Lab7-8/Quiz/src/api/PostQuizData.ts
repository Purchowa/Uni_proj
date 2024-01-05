import { fetch as netFetch } from "@react-native-community/netinfo";
import { UserScore } from "../types/QuizType";

async function postData<Union = UserScore>(endpoint: string, data: Union) {
    let jsonResponse;
    try {
        const response = await fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
        jsonResponse = response;
    }
    catch (error) {
        console.error(error);
    }
    finally {
        return jsonResponse;
    }
}

export async function postUserScore(data: UserScore) {
    netFetch().then(state => {
        if (state.isConnected) {
            return postData('https://tgryl.pl/quiz/result', data);
        }
    })
}