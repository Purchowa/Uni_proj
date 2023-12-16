import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../containers/Home';
import SolveQuiz from '../containers/SolveQuiz';
import UserResult from '../containers/UserResult';
import { AppRegulations } from '../components/AppRegulations';
import { DrawerNavParamList } from './NavParams/DrawerNavParamList';
import { Quiz, QuizDesc } from '../types/QuizType';
import { getEveryTestDesc } from '../api/GetQuizData';

const Drawer = createDrawerNavigator<DrawerNavParamList>();

export default function MainNav() {
  const [quizDesc, setQuizDesc] = useState<QuizDesc[]>();

  const pickRandomIndex = (quizContainer: QuizDesc[]) => {
    return Math.floor(Math.random() * quizContainer.length);
  }

  useEffect(() => {
    (async () => {
      setQuizDesc(await getEveryTestDesc());
      SplashScreen.hide();
    })();
  }, [])

  return (
    <>
      <NavigationContainer>
        {quizDesc && 
          <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} initialParams={{ quizDesc: quizDesc }} />
            <Drawer.Screen name="Quiz" component={SolveQuiz} initialParams={{ pickedQuizID: quizDesc[0].id, quizType: quizDesc[0].tags.join(','), quizDesc: quizDesc }} options={{ unmountOnBlur: true }} />
            <Drawer.Screen name="Results" component={UserResult} />
          </Drawer.Navigator>}
      </NavigationContainer>
      <AppRegulations />
    </>
  );
}