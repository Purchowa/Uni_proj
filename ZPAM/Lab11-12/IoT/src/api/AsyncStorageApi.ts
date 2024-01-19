import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageDevicesKey } from "../strings/Names";
import { DeviceButtonType } from '../types/DeviceButtonType';

export async function saveDevicesToStorage(devices: DeviceButtonType[]) {
    try {
        await AsyncStorage.setItem(storageDevicesKey, JSON.stringify(devices));
    }
    catch (error) {
        console.error(error);
    }
};

export async function getDevicesFromStorage(): Promise<DeviceButtonType[]> {
    let devices: DeviceButtonType[] = [];
    try {
        const value = await AsyncStorage.getItem(storageDevicesKey);
        if (value !== null) {
            devices = JSON.parse(value);
        }
    }
    catch (error) {
        console.log(error);
    }

    return devices;
};
