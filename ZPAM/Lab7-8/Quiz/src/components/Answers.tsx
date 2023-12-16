import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Answer } from '../types/QuizType';
import { fontFamily, globalStyle } from "../styles/style";

export type AnswerHandler = {
    correctAnswer: () => void,
    anyAnswer: () => void
}

function SingleAnswer({ answer, answerHandler }: { answer: Answer, answerHandler: AnswerHandler }) {
    // const [buttonStyle, setButtonStyle] = useState<ViewStyle>(); // For variable styles

    const onAnswer = () => {
        if (answer.isCorrect) {
            answerHandler.correctAnswer();
        }
        answerHandler.anyAnswer();
    }

    return (
        <TouchableOpacity
            style={[style.answerContainer.button, style.answerContainer.waitingButton]}
            onPress={onAnswer}
        >
            <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[globalStyle.button.text, fontFamily.button, style.answerContainer.button.text]}>{answer.content}</Text>
        </TouchableOpacity>
    );
}

export function Answers({ answers, answerHandler }: { answers: Answer[], answerHandler: AnswerHandler }) {
    return (
        <View style={style.answerContainer}>
            {
                answers.map((answer: Answer, index: number) => (
                    <SingleAnswer key={index} answer={answer} answerHandler={answerHandler} />
                ))
            }
        </View >

    );
}

const style = StyleSheet.create({
    answerContainer: {
        marginVertical: 24,
        rowGap: 20,

        button: {
            borderRadius: 6,
            text: {
                fontSize: 30,
                padding: 16,
            }
        },

        waitingButton: {
            backgroundColor: 'black',
        },

        goodButton: {
            backgroundColor: 'green',
        },

        badButton: {
            backgroundColor: 'red',
        }

    }
});