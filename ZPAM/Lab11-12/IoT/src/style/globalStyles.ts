import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: '#0066ff',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,

        text: {
            fontSize: 24,
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Montserrat-SemiBold'
        }
    },

    deviceBox: {
        margin: 16,
        padding: 8,
        backgroundColor: 'black',
        minWidth: "25%",
        maxHeight: "15%",
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    }
});

export default globalStyles;