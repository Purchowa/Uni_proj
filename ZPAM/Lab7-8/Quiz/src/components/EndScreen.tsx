import { Overlay } from "@rneui/themed";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyle } from "../styles/style";

type EndScreenProps = {
    isVisible: boolean,
    points: number,
    totalPoints: number,
    retryQuiz: () => void,
    navigateHome: () => void,
}

export function EndScreen(props: EndScreenProps) {

    return (
        <Overlay isVisible={props.isVisible} overlayStyle={style.endScreenContainer}>
            <View style={style.endScreenContainer.header}>
                <Text style={globalStyle.header}>Ukończyłeś quiz!</Text>
                <Text style={style.endScreenContainer.header.content}>Twój wynik to {props.points} na {props.totalPoints}</Text>
            </View>
            <View>
                <TouchableOpacity style={globalStyle.button} onPress={props.retryQuiz}>
                    <Text style={globalStyle.button.text}>Spróbuj ponownie</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.button} onPress={props.navigateHome}>
                    <Text style={globalStyle.button.text}>Wybierz inny quiz</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    );
}

const style = StyleSheet.create({
    endScreenContainer: {
        backgroundColor: '#ffcc99',
        padding: 16,
        justifyContent: 'space-between',
        height: '60%',

        header: {
            alignItems: 'center',
            content: {
                marginVertical: 8,
                fontSize: 18
            }
        }

    },
});