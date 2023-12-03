import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerNavParamList } from './DrawerNavParamList';

export type HomeProps = {
    navigation: DrawerNavigationProp<DrawerNavParamList, 'Home'>
}

export type QuizProps = {
    navigation: DrawerNavigationProp<DrawerNavParamList, 'Quiz'>
}