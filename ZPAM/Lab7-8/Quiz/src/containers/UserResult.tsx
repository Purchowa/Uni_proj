import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Result } from '../types/QuizType';
import { getEveryResult } from '../api/GetQuizData'

function ResultsHeader() {

    const headerData: string[] = [
        'Nick',
        'Punkty',
        'Typ',
        'Data'
    ];

    return (
        <View style={resultStyles.container}>
            {
                headerData.map((column, idx) =>
                    <Text style={[resultStyles.text, resultStyles.header]} key={idx} >{column}</Text>
                )
            }
        </View>
    );
}

function SingleResult({ prop }: { prop: Result }) {
    return(
        <View style={resultStyles.container}>
            <Text style={resultStyles.text}>{prop.nick}</Text>
            <Text style={resultStyles.text}>{prop.score}/{prop.total}</Text>
            <Text style={resultStyles.text}>{prop.type}</Text>
            <Text style={resultStyles.text}>{prop.createdOn}</Text>
        </View>
    );
}

function Separator() {
    return (
        <View
            style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth
            }}
        />
    );
}

export default function UserResult() {

    const [refreshing, setRefreshing] = useState(false);
    const [results, setResults] = useState<Result[]>();

    const getResults = async () => {
        setRefreshing(true);
        setResults(await getEveryResult());
        setRefreshing(false);
    }

    useEffect(() => {
        getResults();
    }, []);

    return(
        <View style={listStyles.container}>
            <FlatList 
                data={results}
                renderItem={({item}) => <SingleResult prop={item}/>} 
                ListHeaderComponent={ResultsHeader}
                ItemSeparatorComponent={Separator}
                refreshing={refreshing}
                onRefresh={getResults}
            />
        </View>
    );
}


const resultStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 8
    },

    text: {
        fontSize: 18,
        color: 'black',
        width: '25%',
        textAlign: 'center',
        marginVertical: 8,
        flexShrink: 1,
    },
    
    header: {
        fontWeight: 'bold',
    }
});


const listStyles = StyleSheet.create({
    container: {
        margin: 4
    }
});