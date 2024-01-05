import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearProgress } from '@rneui/themed';

import { QuizProps } from '../navigation/NavParams/DrawerNavProps';
import { SingleQuiz } from '../types/QuizType';
import { Answers, AnswerHandler } from '../components/Answers';
import { EndScreen } from '../components/EndScreen';
import { globalStyle, fontFamily } from '../styles/style';
import { getTest } from '../api/GetQuizData';

export default function SolveQuiz({ route, navigation }: QuizProps) {
    const [timeInSec, setTime] = useState(0);
    const [isEndScreenVisible, changeEndScreenVisibility] = useState(false);
    const [isQuizDataLoading, setQuizDataLoading] = useState(true);
    const [quizData, setQuizData] = useState<SingleQuiz>({ name: 'test', tasks: [{ question: 'ala', answers: [{ content: 'dada', isCorrect: false }], duration: 3 }] });
    const [points, setPoints] = useState(0);
    const [taskNumber, setTaskNumber] = useState(0);

    const linearProgressDurationInMs = 100;

    useEffect(() => {
        (async () => {
            setQuizData(await getTest(route.params.pickedQuizID));
            setQuizDataLoading(false);
        })();
    }, []);

    const answerHandler: AnswerHandler = {
        correctAnswer: () => {
            setPoints(points + 1);
        },

        anyAnswer: () => {
            setTimeout(() => {
                if (taskNumber < quizData.tasks.length - 1) {
                    setTaskNumber(taskNumber + 1);
                }
                else
                    changeEndScreenVisibility(true);
            }, 1000);
        }
    }

    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
    useEffect(() => {
        let id: NodeJS.Timeout;
        if (timeInSec < quizData.tasks[taskNumber].duration && !isEndScreenVisible) {
            id = setTimeout(() => {
                setTime(timeInSec + 1);
            }, 1000);
            setTimeoutID(id);
        }
        else {
            answerHandler.anyAnswer();
        }
        return () => clearTimeout(id);
    }, [timeInSec]);

    useEffect(() => {
        clearTimeout(timeoutID);
        setTime(0);
        if (taskNumber === quizData.tasks.length) {
            changeEndScreenVisibility(true);
        }

    }, [taskNumber]);

    return(
        <>
            {isQuizDataLoading ?
                (<ActivityIndicator size='large' color='orange' />) :
                (
                    <>
                        <View style={style.mainContainer}>
                            <View>
                                <Text style={globalStyle.header}>{quizData.name}</Text>
                                <View style={style.quizInfo}>
                                    <Text style={[style.quizInfo.text, fontFamily.info]}>Pytanie: {taskNumber + 1}</Text>
                                    <Text style={[style.quizInfo.text, fontFamily.info]}>Całkowity czas: {quizData.tasks[taskNumber].duration} sekund</Text>
                                </View>
                                <LinearProgress animation={{ duration: linearProgressDurationInMs }} variant='determinate' color='orange' style={style.progressBar} value={timeInSec / quizData.tasks[taskNumber].duration} />
                                <Text style={[style.questionContent, fontFamily.content]}>{quizData.tasks[taskNumber].question}</Text>
                            </View>
                            <Answers answers={quizData.tasks[taskNumber].answers} answerHandler={answerHandler} />
                        </View>
                        <EndScreen
                            isVisible={isEndScreenVisible}
                            points={points}
                            totalPoints={quizData.tasks.length}
                            type={route.params.quizType}
                            retryQuiz={() => { setTime(0); setTaskNumber(0); changeEndScreenVisibility(false); }}
                            navigateHome={() => navigation.navigate('Home', { quizSummary: route.params.quizSummary })}
                        />
                    </>
                )}

        </>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-between',
        padding: 12,
        height: '100%',
    },

    questionContent: {
        fontSize: 20,
    },

    progressBar: {
        marginVertical: 16,
        height: 8,
    },

    quizInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        text: {
            fontWeight: 'bold',
        }
    },
});