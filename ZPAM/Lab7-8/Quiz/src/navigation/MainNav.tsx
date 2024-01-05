import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../containers/Home';
import SolveQuiz from '../containers/SolveQuiz';
import UserResult from '../containers/UserResult';
import { AppRegulations } from '../components/AppRegulations';
import { DrawerNavParamList } from './NavParams/DrawerNavParamList';
import { QuizSummary } from '../types/QuizType';
import { getEveryTestDesc } from '../api/GetQuizData';
import { QuizProps } from './NavParams/DrawerNavProps';
import { updateHistoricQuizData } from '../database/service/dbUpdateData';

const Drawer = createDrawerNavigator<DrawerNavParamList>();

export default function MainNav() {
  const [quizSummary, setQuizSummary] = useState<QuizSummary[]>();
  const [randomIdx, setRandomIdx] = useState<number>();

  useEffect(() => {
    (async () => {
      await getEveryTestDesc().then(
        (quizSummary) => { setQuizSummary(quizSummary); setRandomIdx(pickRandomIndex(quizSummary)); },
        (error) => { console.error(error); }
      );
      updateHistoricQuizData(new Date().toLocaleDateString());
      SplashScreen.hide();
    })();
  }, []);

  const pickRandomIndex = (quizContainer: QuizSummary[]) => {
    return Math.floor(Math.random() * quizContainer.length);
  }

  const SolveQuizFocus = ({ route, navigation }: QuizProps) => { // TODO
    useFocusEffect(
      React.useCallback(() => {
        if (quizSummary) {
          setRandomIdx(pickRandomIndex(quizSummary));
          if (randomIdx) {
            navigation.setParams({ pickedQuizID: quizSummary[randomIdx].id, quizType: quizSummary[randomIdx].tags.join(',') });
          }
          console.log(randomIdx);
        };
      }, [quizSummary])
    );

    return (<SolveQuiz route={route} navigation={navigation} />);
  };

  return (
    <>
      <NavigationContainer>
        {quizSummary && randomIdx ?
          <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name="Home" component={Home} initialParams={{ quizSummary: quizSummary }} />
            <Drawer.Screen name="Quiz" component={SolveQuiz} initialParams={{ pickedQuizID: quizSummary[randomIdx].id, quizType: quizSummary[randomIdx].tags.join(','), quizSummary: quizSummary }} options={{ unmountOnBlur: true, drawerLabel: 'Random quiz' }} />
            <Drawer.Screen name="Results" component={UserResult} />
          </Drawer.Navigator> : null}
      </NavigationContainer>
      <AppRegulations />
    </>
  );
}