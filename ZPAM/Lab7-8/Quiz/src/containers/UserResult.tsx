import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Result } from '../types/QuizType';
import { getEveryResult } from '../api/GetQuizData'
import { fontFamily } from '../styles/style';
import React from 'react';

function ResultsHeader() {

    const headerData: string[] = [
        'Nick',
        'Punkty',
        'Typ',
        'Data'
    ];

    return (
        <View style={[resultStyles.header]}>
            {
                headerData.map((column, idx) =>
                    <Text style={[resultStyles.text, fontFamily.header]} key={idx} >{column}</Text>
                )
            }
        </View>
    );
}

function SingleResult({ prop }: { prop: Result }) {
    const textStyle = [resultStyles.text, fontFamily.content];

    return(
        <View style={resultStyles.container}>
            <Text style={textStyle}>{prop.nick}</Text>
            <Text style={textStyle}>{prop.score}/{prop.total}</Text>
            <Text style={textStyle}>{prop.type}</Text>
            <Text style={textStyle}>{prop.createdOn}</Text>
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
                stickyHeaderIndices={[0]}
                stickyHeaderHiddenOnScroll={true}
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
        marginHorizontal: 4,
    },

    text: {
        fontSize: 14,
        color: 'black',
        width: '25%',
        textAlign: 'center',
        marginVertical: 4,
        paddingHorizontal: 4,
        flexShrink: 1,
    },

    header: {
        backgroundColor: 'white',
        flexDirection: 'row',
    }
});


const listStyles = StyleSheet.create({
    container: {
        margin: 2
    }
});