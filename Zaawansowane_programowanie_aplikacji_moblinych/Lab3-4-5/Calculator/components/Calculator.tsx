import {
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import { evaluate } from 'mathjs';
import SplashScreen from 'react-native-splash-screen';

import { CalculatorLogic } from './CalculatorLogic';
import { Orientation } from './Orientation';
import { CalculatorLayout } from './CalculatorLayout'
import CalculatorKey from './CalculatorKey';
import useAritmeticStack from './useArithmeticStack'
import { useEffect } from 'react';

export default function Calculator(): JSX.Element{
    useEffect( () => {
        if (Platform.OS === 'android'){
            SplashScreen.hide();
        }
    }, []);

    const stack = useAritmeticStack();
    const isFunctionValidToUse = (!stack.isEmpty() && !stack.isHeadAnOperator());

    const calculatorLogic: CalculatorLogic = {
        onNumber: (number: string) => {
            return () => stack.push(number)
        },

        onDot: (dot: string) =>{
            return () => !stack.isHeadFloatingNumber() ? stack.push(dot) : undefined
        },

        onConstant: (number: string) => {
            return () => {
                if (stack.isHeadAnOperator()){
                    stack.push(number);
                }
                else{
                    const numberInfo = stack.getHeadNumber();
                    stack.replace(number, numberInfo.numberOfDigits);
                }
            }
        },

        onOperand: (operand: string) => {return () => { 
            if (isFunctionValidToUse)
                stack.push(operand);
        }},

        onBracketFunction: (mathFunc: string) => {return () => {
            if (isFunctionValidToUse){
                const numberInfo = stack.getHeadNumber();
                stack.replace(evaluate(`${mathFunc}(${numberInfo.value})`), numberInfo.numberOfDigits);
            }
        }},

        onPowerFunction: (mathFunc: string) => {return () => {
            if (isFunctionValidToUse){
                const numberInfo = stack.getHeadNumber();
                stack.replace(evaluate(`${numberInfo.value}${mathFunc}`), numberInfo.numberOfDigits);
            }
        }},

        onClear: () => {return () => stack.clear()},

        onRemoveElement: () => { return () => stack.pop()},

        onCalculate: () => {return () => {
            if (isFunctionValidToUse)
                stack.clear([evaluate(stack.toString())])
        }}
    }

    const layout = CalculatorLayout(Orientation(), calculatorLogic);
    return (
        <View style={layout.styles.mainView}>
        <View style={layout.styles.displayContainer}>
            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={layout.styles.displayContainer.text}>{stack.toString()}</Text>
        </View>
        <View style={layout.styles.keysContainer}>
            {
                layout.buttons.map((row: CalculatorKey[]) => (
                    row.map((item: CalculatorKey, index: number) => (
                        <TouchableOpacity key={index} style={[layout.styles.button, item.style]} onPress={item.onPress?.(item.value)} >
                            <Text style={layout.styles.button.text}>{ item.symbol ? item.symbol : item.value}</Text>
                        </TouchableOpacity>
                ))))
            }
        </View>
        </View>
    );
}