import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export function ConnectionScreen() {
    const [scannedDevices, setScannedDevices] = useState<string[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const scanAndConnect = () => {
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                return
            }
            if (device?.name) {
                if (!scannedDevices.includes(device.name)) {
                    setScannedDevices([...scannedDevices, device.name]);
                }
                // Check if it is a device you are looking for based on advertisement data
                // or other criteria.
                if (device?.name === 'GR_5') {
                    // Stop scanning as it's not necessary if you are scanning for one device.
                    manager.stopDeviceScan()
                    // Proceed with connection.

                    device.connect()
                        .then(device => {
                            return device.discoverAllServicesAndCharacteristics()
                        })
                        .then(device => {
                            console.log("Device ID: ", device.id);
                            device.services().then((services) => {
                                services.forEach((service, i) => {
                                    service.characteristics().then((value) => {
                                        console.log("Characterisic: ", value[0].uuid);
                                        console.log("Service: ", value[0].serviceUUID);
                                    })
                                });
                            })
                        })
                        .catch(error => {
                            console.error(error);
                        })
                }
            }

        })
    }

    useEffect(() => {
        const subscription = manager.onStateChange(state => {
            if (state === 'PoweredOn') {
                scanAndConnect();
                subscription.remove();
            }
        }, true);
        return () => subscription.remove()
    }, [manager]);

    useEffect(() => {
        setScannedDevices([]);
        setRefreshing(false);
    }, [refreshing])

    return (
        <View style={style.container}>
            <Text style={style.scannedHeaderText}>Scanned devices:</Text>
            <FlatList
                data={scannedDevices}
                renderItem={({ item, index }) => <Text key={index} style={style.scannedContentText}>{item}</Text>}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
                style={style.scannedDevContainer}
            />
        </View>
    )

}

const style = StyleSheet.create({
    container: {
        margin: 8,
    },
    scannedDevContainer: {
        padding: 8,
    },
    scannedHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        textAlign: 'center'
    },
    scannedContentText: {
        fontSize: 18,
        color: 'black',
    }
});