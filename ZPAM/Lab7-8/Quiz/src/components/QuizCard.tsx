import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';

type QuizInfo = {
    id: number;
    summary: string;
    onQuizPress: () => void;
}

export function QuizCard(prop: QuizInfo){
    return (
        <TouchableHighlight style={style.container} onPress={prop.onQuizPress} underlayColor='#fbcdef'>
            <View style={style.touchableCard}>
                <Text style={[style.header, style.text]}>Quiz {prop.id}</Text>
                <Text style={[style.summary, style.text]}>{prop.summary}</Text>
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
        fontWeight: 'bold',
        fontSize: 30,
    },

    summary: {
        fontSize: 20
    }

});