import AsyncStorage from '@react-native-async-storage/async-storage';
import { Overlay } from '@rneui/base';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { globalStyle, fontFamily } from '../styles/style';

function mapStringToBoolean(value: string): boolean {
    return value === '0' ? false : true;
}

export function AppRegulations() {
    const [areRegulationsShown, setAreRegulationsShown] = useState(true);
    const storageKey = 'showRegulations';

    const saveToStorage = async (value: string) => {
        try {
            await AsyncStorage.setItem(storageKey, value);
            setAreRegulationsShown(mapStringToBoolean(value));
        }
        catch (error) {
            console.log(error);
        }
    };

    const readFromStorage = async () => {
        try {
            const value = await AsyncStorage.getItem(storageKey);
            if (value !== null) {
                setAreRegulationsShown(mapStringToBoolean(value));
            }
            else {
                const valueToStorage = '1';
                saveToStorage(valueToStorage);
                setAreRegulationsShown(mapStringToBoolean(valueToStorage));
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        readFromStorage();
    }, []);

    if (areRegulationsShown) {
        return (
            <Overlay isVisible={areRegulationsShown} overlayStyle={styles.container}>
                <Text style={[globalStyle.header]}>
                    Regulamin aplikacji
                </Text>
                <Text style={[styles.content, fontFamily.content]}>
                    Miłość cierpliwa jest, łaskawa jest. Miłość nie zazdrości, nie szuka poklasku, nie unosi się pychą; nie dopuszcza się bezwstydu, nie szuka swego, nie unosi się gniewem, nie pamięta złego, nie cieszy się z niesprawiedliwości, lecz współweseli się z prawdą. Wszystko znosi, wszystkiemu wierzy, we wszystkim pokłada nadzieję, wszystko przetrzyma.
                </Text>
                <TouchableOpacity style={[globalStyle.button, { marginTop: 16 }]} onPress={() => { saveToStorage('0') }}>
                    <Text style={globalStyle.button.text}>
                        Akceptuję
                    </Text>
                </TouchableOpacity>
            </Overlay>
        )
    }
    else {
        <></>
    }

}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
    },

    content: {
        fontSize: 16,
    }
});