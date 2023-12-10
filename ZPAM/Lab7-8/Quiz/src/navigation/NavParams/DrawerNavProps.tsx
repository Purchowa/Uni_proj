import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavParamList } from './DrawerNavParamList';

export type HomeProps = DrawerScreenProps<DrawerNavParamList, 'Home'>;

export type QuizProps = DrawerScreenProps<DrawerNavParamList, 'Quiz'>;