type emptyHigherOreder = () => emptyCallback;
type emptyCallback = () => void;

export interface CalculatorLogic{
    onNumber: (value: string) => emptyCallback,
    onDot: (value: string) => emptyCallback,
    onConstant: (value:  string) => emptyCallback,
    onOperand: (value: string) => emptyCallback,
    onBracketFunction: (value: string) => emptyCallback,
    onPowerFunction: (value: string) => emptyCallback,
    onClear: emptyHigherOreder,
    onRemoveElement: emptyHigherOreder,
    onCalculate: emptyHigherOreder
}