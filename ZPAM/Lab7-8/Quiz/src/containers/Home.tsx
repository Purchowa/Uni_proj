import { ScrollView, StyleSheet, View } from 'react-native';
import { QuizCard } from '../components/QuizCard';
import { CheckResults}  from '../components/CheckResults';
import { HomeProps } from '../navigation/NavParams/DrawerNavProps';

export default function Home({ route, navigation }: HomeProps) {
    return(
        <View style={style.container}>
            <ScrollView>
                {route.params.quizDesc.map((quiz, index) => (
                    <QuizCard key={index} quizDesc={quiz} onQuizPress={() => { navigation.navigate('Quiz', { pickedQuizID: quiz.id, quizIDs: [] }) }}></QuizCard>
                ))}
            </ScrollView>
            <CheckResults route={route} navigation={navigation} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexGrow: 1
    }
});