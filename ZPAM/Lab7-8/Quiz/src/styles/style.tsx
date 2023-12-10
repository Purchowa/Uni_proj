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
            textAlign: 'center'    
        }
    },

    header: {
        marginVertical: 8,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
});

export { globalStyle };