import { ScrollView, StyleSheet, View } from 'react-native';
import { QuizCard } from '../components/QuizCard';
import { CheckResults}  from '../components/CheckResults';
import { HomeProps } from '../navigation/NavParams/DrawerNavProps';
import { shuffle } from 'lodash';

export default function Home({ route, navigation }: HomeProps) {
    const shuffeledQuizSummary = shuffle(route.params.quizSummary);
    return(
        <View style={style.container}>
            <ScrollView>
                {shuffeledQuizSummary.map((quiz, index) => (
                    <QuizCard key={index} quizDesc={quiz} onQuizPress={() => { navigation.navigate('Quiz', { pickedQuizID: quiz.id, quizType: quiz.tags.join(','), quizSummary: route.params.quizSummary }) }}></QuizCard>
                ))}
            </ScrollView>
            <CheckResults route={route} navigation={navigation} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexGrow: 1,
    }
});