import { Text, TouchableHighlight, StyleSheet } from "react-native"
import { DevicesProps } from "../navigation/nav-params/StackNavProps";
import globalStyles from "../style/globalStyles";

export function AddDevice({ navigation, route }: DevicesProps) {
    return (
        <TouchableHighlight style={globalStyles.deviceBox} onPress={() => navigation.navigate('newDevice', { devices: route.params.devices })}>
            <Text style={style.text}>+</Text>
        </TouchableHighlight >
    )
}

const style = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 40,
        padding: 8,
    }
});