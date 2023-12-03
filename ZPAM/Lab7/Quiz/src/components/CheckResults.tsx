import { globalStyle } from "../styles/style";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { HomeProps } from '../navigation/types/DrawerNavProps';

export function CheckResults({ navigation }: HomeProps){
    return (
        <View style={style.container}>
            <Text style={style.header}>Zobacz swoje wyniki</Text>
            <TouchableOpacity style={globalStyle.button} onPress={() => navigation.navigate('Results')}>
                <Text style={globalStyle.button.text}>Odkryj</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
        padding: 8,
    },

    header: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold'
    }
});