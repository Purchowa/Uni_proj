import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DevicesStack } from '../navigation/DevicesStack';
import { ConnectionScreen } from '../containers/ConnectionScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Group screenOptions={{ headerShown: false }}>
          <Tab.Screen name="devicesStack" component={DevicesStack} options={{ tabBarLabel: 'Devices', tabBarIcon: () => (<></>), tabBarLabelStyle: { fontSize: 16, marginBottom: 16 } }} />
        </Tab.Group>
        <Tab.Screen name="connection" component={ConnectionScreen} options={{ tabBarLabel: 'Devices', tabBarIcon: () => (<></>), tabBarLabelStyle: { fontSize: 16, marginBottom: 16 } }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;
