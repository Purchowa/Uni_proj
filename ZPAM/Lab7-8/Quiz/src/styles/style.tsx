import { StyleSheet } from 'react-native'

const globalStyle = StyleSheet.create({
    button: {
        backgroundColor: '#0066ff',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,

        text: {
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Montserrat-SemiBold'
        }
    },

    header: {
        marginVertical: 6,
        textAlign: 'center',
        fontSize: 26,
        color: 'black',
        fontFamily: 'Poppins-Bold',
    }
});

const fontFamily = StyleSheet.create({
    button: {
        fontFamily: 'Montserrat-SemiBold'
    },
    header: {
        fontFamily: 'Poppins-Bold',
    },
    content: {
        fontFamily: 'Poppins-Regular',
    },
    info: {
        fontFamily: 'Poppins-Medium',
    }
});

export { globalStyle, fontFamily };