import { ScrollView, StyleSheet, View } from 'react-native';
import { QuizCard } from '../components/QuizCard';
import { CheckResults}  from '../components/CheckResults';
import { HomeProps } from '../navigation/NavParams/DrawerNavProps';

export default function Home({ route, navigation }: HomeProps) {
    let mockSummary = 'Tekst opisujacy quiz. Czego dotyczy, co sie w nim znajduje itd...'

    return(
        <View style={style.container}>
            <ScrollView>
                {route.params.quizIDs.map((quizID, index) => (
                    <QuizCard key={index} id={index + 1} summary={mockSummary} onQuizPress={() => { navigation.navigate('Quiz', { pickedQuizID: quizID, quizIDs: route.params.quizIDs }) }}></QuizCard>
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