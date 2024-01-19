import { View, StyleSheet } from "react-native";
import { DevicesProps } from "../navigation/nav-params/StackNavProps";
import { AddDevice } from "../components/AddDevice";
import { Device } from "../components/Device";
import { DeviceButtonType } from "../types/DeviceButtonType";
import { saveDevicesToStorage } from "../api/AsyncStorageApi";

export function DevicesScreen({ navigation, route }: DevicesProps) {

    const onHoldDeleteDevice = (device: DeviceButtonType) => {
        const singleElement = 1;
        const index = route.params.devices.indexOf(device);

        route.params.devices.splice(index, singleElement);
        saveDevicesToStorage(route.params.devices);
    }

    return (
        <View style={style.container}>
            {
                route.params.devices.map((device, index) => <Device key={index} deviceButtonInfo={device} onHold={onHoldDeleteDevice} />)
            }
            <AddDevice navigation={navigation} route={route} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '100%',
        maxWidth: '100%'
    }
});