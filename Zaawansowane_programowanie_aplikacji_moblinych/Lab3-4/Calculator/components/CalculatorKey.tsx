import { TextStyle } from "react-native";

export default interface CalculatorKey{
    onPress?: (value: string) => () => void,
    value: string,
    symbol?: string
    style: TextStyle
  }