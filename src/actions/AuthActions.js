import firebase from 'firebase';
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, AUTH_FORM_UPDATE } from './types';
import { Actions } from 'react-native-router-flux';

export const authFormUpdate = ({ prop, value }) => {
  return {
    type: AUTH_FORM_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
  dispatch({ type: LOGIN_USER });
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch(
    { type: LOGIN_USER_SUCCESS, payload: user }
  );
};
