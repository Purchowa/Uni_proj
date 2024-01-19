import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackNavParamList } from "./StackNavParamList";

export type DevicesProps = NativeStackScreenProps<StackNavParamList, 'devices'>;
export type NewDeviceProps = NativeStackScreenProps<StackNavParamList, 'newDevice'>;