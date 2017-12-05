import firebase from 'firebase';
import { BUSINESS_SIGNUP_UPDATE, SIGNUP_BUSINESS, SIGNUP_BUSINESS_FAIL, SIGNUP_BUSINESS_SUCCESS } from './types';
import { Actions } from 'react-native-router-flux';

export const businessFormUpdate = ({ prop, value }) => {
  return {
    type: BUSINESS_SIGNUP_UPDATE,
    payload: { prop, value }
  };
};

export const businessSignUp = (props) => {
      return (dispatch) => {
      dispatch({ type: SIGNUP_BUSINESS });
      firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
            .then(user => signUpBusinessSuccess(dispatch, user))
            .catch(() => signUpBusinessFail(dispatch));
        };
      };

const signUpBusinessFail = (dispatch) => {
  dispatch({ type: SIGNUP_BUSINESS_FAIL });
};

const signUpBusinessSuccess = (dispatch, user) => {
  dispatch(
    { type: SIGNUP_BUSINESS_SUCCESS, payload: user }
  );
  Actions.login();
};
