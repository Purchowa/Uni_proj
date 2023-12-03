import { ScrollView, StyleSheet, View } from 'react-native';
import { QuizCard } from '../components/QuizCard';
import { CheckResults}  from '../components/CheckResults';
import { HomeProps } from '../navigation/types/DrawerNavProps';

export default function Home({ navigation }: HomeProps){

    let mockSummary = 'Tekst opisujacy quiz. Czego dotyczy, co sie w nim znajduje itd...'
    const numberOfCards = 15;
    const cards = [];

    for (let i = 1; i <= numberOfCards; i++){
        cards.push(<QuizCard key={i} id={i} summary={mockSummary} onQuizPress={() => {navigation.navigate('Quiz')}}></QuizCard>)
    }

    return(
        <View style={{flexShrink: 1}}>
            <ScrollView>
                {cards}
            </ScrollView>
            <CheckResults navigation={navigation}/>
        </View>
    );
}

const style = StyleSheet.create({

});