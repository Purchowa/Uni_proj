import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewDeviceScreen } from '../containers/NewDeviceScreen';
import { DevicesScreen } from '../containers/DevicesScreen';
import { DeviceButtonType } from '../types/DeviceButtonType';
import { getDevicesFromStorage } from '../api/AsyncStorageApi';

export function DevicesStack() {
    const DevicesStack = createNativeStackNavigator();
    const [devices, setDevices] = useState<DeviceButtonType[]>();

    useEffect(() => {
        (async () => {
            setDevices(await getDevicesFromStorage());
        })();
    }, []);

    if (devices) {
        return (
            <DevicesStack.Navigator initialRouteName='devices'>
                <DevicesStack.Screen name='devices' component={DevicesScreen} initialParams={{ devices: devices }} options={{ headerTitle: 'Devices' }} />
                <DevicesStack.Screen name='newDevice' component={NewDeviceScreen} initialParams={{ devices: devices }} options={{ headerTitle: 'New device' }} />
            </DevicesStack.Navigator>
        )
    }

}