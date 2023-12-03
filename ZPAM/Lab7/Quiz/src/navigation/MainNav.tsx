import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../containers/Home';
import SolveQuiz from '../containers/SolveQuiz';
import UserResult from '../containers/UserResult';

const Drawer = createDrawerNavigator();

export default function MainNav() {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Quiz" component={SolveQuiz} options={{unmountOnBlur: true}}/>
            <Drawer.Screen name="Results" component={UserResult}/>
        </Drawer.Navigator>
    </NavigationContainer>
  );
}