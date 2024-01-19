import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabNavParamList } from "./TabNavParamList";

export type DevicesStackProps = BottomTabScreenProps<TabNavParamList, 'devicesStack'>;
export type ConnectionProps = BottomTabScreenProps<TabNavParamList, 'connection'>;