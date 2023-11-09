import { CalculatorPortraitLayout } from "./CalculatorPortraitLayout";
import CalculatorKey from './CalculatorKey';
import { CalculatorLogic } from './CalculatorLogic';

export function CalculatorLandscapeLayout(logic: CalculatorLogic){
    const portrait = CalculatorPortraitLayout(logic);

    const landscape: CalculatorKey[][] = [
        [
            {
                onPress: logic.onConstant,
                value: '3.141592',
                symbol: 'π',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onConstant,
                value: '2.718281',
                symbol: 'e',
                style: {backgroundColor: '#f4f4f4'},
            },
        ],
        [
            {
                onPress: logic.onBracketFunction,
                value: 'sqrt',
                symbol: '√',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onPowerFunction,
                value: '^2',
                symbol: 'x²',
                style: {backgroundColor: '#f4f4f4'},
            },
        ],
        [
            {
                onPress: logic.onBracketFunction,
                value: 'log',
                symbol: 'ln',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onBracketFunction,
                value: 'log10',
                symbol: 'log',
                style: {backgroundColor: '#f4f4f4'},
            },
        ],
        [
            {
                onPress: logic.onBracketFunction,
                value: 'sin',
                style: {backgroundColor: '#f4f4f4'},
            },
            {   onPress: logic.onBracketFunction,
                value: 'cos',
                style: {backgroundColor: '#f4f4f4'},
            },
        ],
        [
            {
                onPress: logic.onBracketFunction,
                value: 'tan',
                symbol: 'tg',
                style: {backgroundColor: '#f4f4f4'},
            },
            {
                onPress: logic.onBracketFunction,
                value: 'cot',
                symbol: 'ctg',
                style: {backgroundColor: '#f4f4f4'},
            },
        ]
    ];
    return landscape.map((row: CalculatorKey[], index) => ( row.concat(portrait[index]) ));
}