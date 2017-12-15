import firebase from 'firebase';
import { USER_MAIN_UPDATE, USER_MAIN_SET_PROFILE } from './types';
import { Actions } from 'react-native-router-flux';

export const userMainUpdate = ({ prop, value }) => {
  return {
    type: USER_MAIN_UPDATE,
    payload: { prop, value }
  };
};

export const userMainSetProfile = ({user, uid}) => {
  return {
    type: USER_MAIN_SET_PROFILE,
    payload: {user, uid}
  };
}
