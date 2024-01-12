import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

function App() {
  const [BLInfo, setBLInfo] = useState("");

  const manager = new BleManager();

  useEffect(() => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        scanAndConnect()
        subscription.remove()
      }
    }, true)
    return () => subscription.remove()
  }, [manager])

  return (
    <View>
      <Text>IoT</Text>
      <Text>{BLInfo}</Text>
    </View>
  )
}

export default App;
