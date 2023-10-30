import CalculatorKey from './CalculatorKey';
import { CalculatorLogic } from './CalculatorLogic';

function CalculatorPortraitLayout(logic: CalculatorLogic): CalculatorKey[][]{

    const keysLayout: CalculatorKey[][] = [
        [
            {
                onPress: logic.onClear,
                value: 'AC',
                style: {backgroundColor: '#f4f4f4'}
            },
            {
                value: '',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onRemoveElement,
                value: '⌫',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onOperand,
                symbol: '÷',
                value: '/',
                style: {backgroundColor: '#f4f4f4'},
            }
        ],
        [
            {
                onPress: logic.onNumber,
                value: '7',
                style: {backgroundColor: 'white'}
            },
            {
                onPress: logic.onNumber,
                value: '8',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onNumber,
                value: '9',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onOperand,
                symbol: '×',
                value: '*',
                style: {backgroundColor: '#f4f4f4'},
            } 
        ],
        [
            {
                onPress: logic.onNumber,
                value: '4',
                style: {backgroundColor: 'white'}
            },
            {
                onPress: logic.onNumber,
                value: '5',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onNumber,
                value: '6',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onOperand,
                value: '-',
                style: {backgroundColor: '#f4f4f4'},
            } 
        ],
        [
            {
                onPress: logic.onNumber,
                value: '1',
                style: {backgroundColor: 'white'}
            },
            {
                onPress: logic.onNumber,
                value: '2',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onNumber,
                value: '3',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onOperand,
                value: '+',
                style: {backgroundColor: '#f4f4f4'},
            } 
        ],
        [
            {
                onPress: logic.onNumber,
                value: '0',
                style: {backgroundColor: 'white'}
            },
            {
                value: '',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onDot,
                value: '.',
                style: {backgroundColor: 'white'},
            },
            {
                onPress: logic.onCalculate,
                value: '=',
                style: {backgroundColor: 'orange'},
            } 
        ] 
    ];
    
    return keysLayout;
}

export {CalculatorPortraitLayout};