import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { QuizDesc } from '../types/QuizType';
import { globalStyle, fontFamily } from '../styles/style';

type QuizInfo = {
    quizDesc: QuizDesc,
    onQuizPress: () => void;
}

export function QuizCard(prop: QuizInfo) {
    return (
        <TouchableHighlight style={style.container} onPress={prop.onQuizPress} underlayColor='#fbcdef'>
            <View style={style.touchableCard}>
                <Text style={[globalStyle.header, style.text]}>{prop.quizDesc.name}</Text>
                <Text style={[style.summary, style.text, fontFamily.content]}>{prop.quizDesc.description}</Text>
                <Text style={[style.info, style.text, fontFamily.info]}>Liczba zadań: {prop.quizDesc.numberOfTasks}</Text>
            </View>
        </TouchableHighlight>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#abcdef',
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 18,
    },

    touchableCard: {
        padding: 8,
    },

    text: {
        color: 'black',
    },

    header: {
        textAlign: 'center',
        fontSize: 30,
    },

    summary: {
        fontSize: 20
    },

    info: {
        textAlign: 'center',
        paddingVertical: 8,
    }

});