import { useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Result = {
    nick: string,
    score: number,
    total: number,
    type: string,
    date: string, // in future might be Date
}

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
            <Text style={resultStyles.text}>{prop.date}</Text>
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

    const results: Result[] = [
        {nick: 'Maciej', score: 23, total: 30, type: 'Historia', date: '29.11.2023'},
        {nick: 'Andrzejjj', score: 23, total: 30, type: 'Historia', date: '29.11.2023'},
        {nick: 'Józek', score: 11, total: 30, type: 'Bzdury', date: '12.12.2012'},
        {nick: 'Zbigniew', score: 30, total: 30, type: 'IT', date: '29.11.2023'},
        { nick: 'Maciej', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Andrzejjj', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Józek', score: 11, total: 30, type: 'Bzdury', date: '12.12.2012' },
        { nick: 'Zbigniew', score: 30, total: 30, type: 'IT', date: '29.11.2023' },
        { nick: 'Maciej', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Andrzejjj', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Józek', score: 11, total: 30, type: 'Bzdury', date: '12.12.2012' },
        { nick: 'Zbigniew', score: 30, total: 30, type: 'IT', date: '29.11.2023' },
        { nick: 'Maciej', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Andrzejjj', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Józek', score: 11, total: 30, type: 'Bzdury', date: '12.12.2012' },
        { nick: 'Zbigniew', score: 30, total: 30, type: 'IT', date: '29.11.2023' },
        { nick: 'Maciej', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Andrzejjj', score: 23, total: 30, type: 'Historia', date: '29.11.2023' },
        { nick: 'Józek', score: 11, total: 30, type: 'Bzdury', date: '12.12.2012' },
        { nick: 'Zbigniew', score: 30, total: 30, type: 'IT', date: '29.11.2023' },
        
    ];

    const onRefreshMock = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    };

    return(
        <View style={listStyles.container}>
            <FlatList 
                data={results}
                renderItem={({item}) => <SingleResult prop={item}/>} 
                ListHeaderComponent={ResultsHeader}
                ItemSeparatorComponent={Separator}
                refreshing={refreshing}
                onRefresh={onRefreshMock}
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