import { StyleSheet, TouchableOpacity, Text } from "react-native";
import globalStyles from "../style/globalStyles";
import { DeviceButtonType } from "../types/DeviceButtonType";
import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const manager = new BleManager();

export function Device({ deviceButtonInfo, onHold }: { deviceButtonInfo: DeviceButtonType, onHold: (device: DeviceButtonType) => void }) {

    const deviceBLE = {
        id: '00:13:AA:00:C1:44',
        serviceUUID: 'FFE0',
        characteristicUUID: 'FFE1'
    }

    const writeToDevice = () => {
        manager.writeCharacteristicWithResponseForDevice(deviceBLE.id, deviceBLE.serviceUUID, deviceBLE.characteristicUUID, Buffer.from(deviceButtonInfo.command).toString('base64'))
            .then((value) => {
                console.log(value);
            }).catch((error) => {
                console.error(error);
            })
    };

    return (
        <TouchableOpacity style={[globalStyles.deviceBox, style.container]} onLongPress={() => onHold(deviceButtonInfo)} onPress={writeToDevice}>
            <Text style={style.headerText}>{deviceButtonInfo.name}</Text>
            <Text style={style.contentText}>{deviceButtonInfo.place}</Text>
            <Text style={style.contentText}>"{deviceButtonInfo.command}"</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ffff99'
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black'
    },
    contentText: {
        fontSize: 16,
        color: 'gray'
    }
});