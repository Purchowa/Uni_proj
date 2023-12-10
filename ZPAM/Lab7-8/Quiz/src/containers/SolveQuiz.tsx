import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearProgress } from '@rneui/themed';
import { QuizProps } from '../navigation/NavParams/DrawerNavProps';
import { Quiz } from '../types/QuizType';
import { Answers, AnswerHandler } from '../components/Answers';
import { EndScreen } from '../components/EndScreen';
import { globalStyle } from '../styles/style';

export default function SolveQuiz({ route, navigation }: QuizProps) {
    const [timeInSec, setTime] = useState(0);
    const [isEndScreenVisible, changeEndScreenVisibility] = useState(false);
    const [isQuizDataLoading, setQuizDataLoading] = useState(true);
    const [quizData, setQuizData] = useState<Quiz>({ name: 'test', tasks: [{ question: 'ala', answers: [{ content: 'dada', isCorrect: false }], duration: 3 }] });
    const [points, setPoints] = useState(0);
    const [taskNumber, setTaskNumber] = useState(0);

    const linearProgressDurationInMs = 100;

    const getQuizData = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/test/' + route.params.pickedQuizID);
            const jsonResponse: Quiz = await response.json();
            setQuizData(jsonResponse);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setQuizDataLoading(false);
        }
    }

    useEffect(() => {
        getQuizData();
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
        if (timeInSec < quizData.tasks[taskNumber].duration && !isEndScreenVisible) {
            setTimeoutID(setTimeout(() => {
                setTime(timeInSec + 1);
            }, 1000));
        }
        else {
            answerHandler.anyAnswer();
        }
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
                                    <Text style={style.quizInfo.text}>Pytanie: {taskNumber + 1}</Text>
                                    <Text style={style.quizInfo.text}>Całkowity czas: {quizData.tasks[taskNumber].duration} sekund</Text>
                                </View>
                                <LinearProgress animation={{ duration: linearProgressDurationInMs }} variant='determinate' color='orange' style={style.progressBar} value={timeInSec / quizData.tasks[taskNumber].duration} />
                                <Text style={style.questionContent}>{quizData.tasks[taskNumber].question}</Text>
                            </View>
                            <Answers answers={quizData.tasks[taskNumber].answers} answerHandler={answerHandler} />
                        </View>
                        <EndScreen
                            isVisible={isEndScreenVisible}
                            points={points}
                            totalPoints={quizData.tasks.length}
                            retryQuiz={() => { setTime(0); setTaskNumber(0); changeEndScreenVisibility(false); }}
                            navigateHome={() => navigation.navigate('Home', { quizIDs: route.params.quizIDs })}
                        />
                    </>
                )}

        </>
    );
}

const style = StyleSheet.create({
    mainContainer:{
        flexDirection: 'column',
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