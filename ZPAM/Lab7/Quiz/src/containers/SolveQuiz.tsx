import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState} from 'react-native';
import { LinearProgress, Overlay } from '@rneui/themed';
import { QuizProps } from '../navigation/types/DrawerNavProps';

import { globalStyle } from '../styles/style';

type Answer = {
    content: string,
    isCorrect: boolean,
    callback?: () => void
};

function SingleAnswer(answer: Answer): React.JSX.Element{

    return(
        <TouchableOpacity style={style.answerContainer.answerButton} onPress={answer.callback}>
            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={style.answerContainer.text}>{answer.content}</Text>
        </TouchableOpacity>
    );
}

export default function SolveQuiz({ navigation }: QuizProps){
    const [timeInSec, setTime] = useState(0);
    const [isLostScreenVisible, changeLostScreenVisibility] = useState(false);
    const linearProgressDurationInMs = 100;

    const onAnswer = () => {
    };

    const onRetry = () => {
        setTime(0);
        changeLostScreenVisibility(false);
    }

    const answers: Answer[] = [
        {
            content: "LUCJUSZ CYNNA",
            isCorrect: true
        },
        {
            content: "JULIUSZ CEZAR",
            isCorrect: false
        },
        {
            content: "LUCJUSZ MURENA",
            isCorrect: false
        },
        {
            content: "MAREK KRASSUS",
            isCorrect: false
        }
    ];
    const durationInSec = 3;

    useEffect(() => {
        if (timeInSec < durationInSec){
            setTimeout(() => {
                setTime(timeInSec + 1);
            }, 1000);
        }
        else{
            changeLostScreenVisibility(true);
        }
    }, [timeInSec]);

    return(
        <View>
            <View style={style.mainContainer}>
                <View>
                    <Text style={style.header}>Quiz X</Text>
                    <View style={style.quizInfo}>
                        <Text style={style.quizInfo.text}>Pytanie: Y</Text>
                        <Text style={style.quizInfo.text}>Czas: {timeInSec}</Text>
                    </View>
                    <LinearProgress animation={{duration: linearProgressDurationInMs}} variant='determinate' color='orange' style={style.progressBar} value={timeInSec / durationInSec}/>
                    <Text style={style.questionContent}>Pytanie dlugie i fajne</Text>
                </View>
                <View style={style.answerContainer}>
                    {
                        answers.map((value: Answer, index: number) =>(
                            <SingleAnswer key={index} content={value.content} isCorrect={value.isCorrect} callback={onAnswer}/>
                        ))
                    }
                </View>
            </View>
            <Overlay isVisible={isLostScreenVisible} overlayStyle={style.lostScreenContainer}>
                    <Text style={style.header}>Przegrałeś</Text>
                    <TouchableOpacity style={globalStyle.button} onPress={onRetry}>
                        <Text style={globalStyle.button.text}>Spróbuj ponownie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyle.button} onPress={() => navigation.navigate('Home')}>
                        <Text style={globalStyle.button.text}>Wybierz inny quiz</Text>
                    </TouchableOpacity>
            </Overlay>
        </View>
    );
}

const style = StyleSheet.create({
    lostScreenContainer: {
        backgroundColor: '#ff6666',
        padding: 16,
        alignItems: 'center',
    },

    mainContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 12,
        height: '100%',
    },

    header: {
        marginVertical: 8,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
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

    answerContainer: {
        marginVertical: 24,
        rowGap: 20,
        
        answerButton: {
            backgroundColor: 'black',
            borderRadius: 6,
        },

        text: {
            color: 'white',
            fontSize: 26,
            textAlign: 'center',
            padding: 16
        }
    }
});