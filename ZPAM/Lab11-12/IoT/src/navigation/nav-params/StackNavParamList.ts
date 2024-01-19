import { DeviceButtonType } from "../../types/DeviceButtonType";

export type StackNavParamList = {
    devices: { devices: DeviceButtonType[] },
    newDevice: { devices: DeviceButtonType[] }
};