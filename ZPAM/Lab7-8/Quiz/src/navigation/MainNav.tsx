import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../containers/Home';
import SolveQuiz from '../containers/SolveQuiz';
import UserResult from '../containers/UserResult';
import { AppRegulations } from '../components/AppRegulations';
import { DrawerNavParamList } from './NavParams/DrawerNavParamList';

const Drawer = createDrawerNavigator<DrawerNavParamList>();

export default function MainNav() {

  const quizIDs: string[] = [
    '62032610069ef9b2616c761e',
    '62032610069ef9b2616c761c',
    '62032610069ef9b2616c761d'
  ];

  useEffect(() => {
    // reading from api
    SplashScreen.hide();
  }, [])

  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name="Home" component={Home} initialParams={{ quizIDs: quizIDs }} />
          <Drawer.Screen name="Quiz" component={SolveQuiz} initialParams={{ quizIDs: quizIDs }} options={{ unmountOnBlur: true }} />
          <Drawer.Screen name="Results" component={UserResult} />
        </Drawer.Navigator>
      </NavigationContainer>
      <AppRegulations />
    </>
  );
}