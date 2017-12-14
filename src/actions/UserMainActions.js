import firebase from 'firebase';
import { USER_MAIN_UPDATE } from './types';
import { Actions } from 'react-native-router-flux';

export const userMainUpdate = ({ prop, value }) => {
  return {
    type: USER_MAIN_UPDATE,
    payload: { prop, value }
  };
};

