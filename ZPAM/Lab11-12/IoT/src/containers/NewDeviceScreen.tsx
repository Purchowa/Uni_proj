import { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { NewDeviceProps } from "../navigation/nav-params/StackNavProps";
import { saveDevicesToStorage } from "../api/AsyncStorageApi";
import globalStyles from "../style/globalStyles";

export function NewDeviceScreen({ navigation, route }: NewDeviceProps) {
    const [name, onChangeName] = useState('');
    const [place, onChangePlace] = useState('');
    const [command, onChangeCommand] = useState('');

    const isFormDataCorrect = () => {
        const isEmpty = (value: string) => value.length === 0;

        return !(isEmpty(name) || isEmpty(place) || isEmpty(command));
    }

    const onAddDevice = () => {
        if (isFormDataCorrect()) {
            route.params.devices.push({ name: name, place: place, command: command });
            saveDevicesToStorage(route.params.devices);
            navigation.navigate('devices', { devices: route.params.devices });
        }
    };

    return (
        <View style={style.container}>
            <TextInput style={style.textInput} placeholder='Name' placeholderTextColor={'gray'} onChangeText={onChangeName} value={name} />
            <TextInput style={style.textInput} placeholder='Place' placeholderTextColor={'gray'} onChangeText={onChangePlace} value={place} />
            <TextInput style={style.textInput} placeholder='Command' placeholderTextColor={'gray'} onChangeText={onChangeCommand} value={command} />
            <View style={style.buttonGroup}>
                <TouchableOpacity style={[globalStyles.button, style.buttonCancel]} onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.button.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.button, style.buttonAdd]} onPress={onAddDevice}>
                    <Text style={globalStyles.button.text}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 8,
    },

    textInput: {
        margin: 4,
        padding: 8,
        borderWidth: 1,
        fontSize: 20,
        color: 'black',
    },

    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonAdd: {
        backgroundColor: 'black',
    },

    buttonCancel: {
        backgroundColor: 'red',
    }
});