import firebase from 'firebase';
import { BUSINESS_SIGNUP_UPDATE, SIGNUP_BUSINESS, SIGNUP_BUSINESS_FAIL, SIGNUP_BUSINESS_SUCCESS, BUSINESS_SIGNUP_RESET } from './types';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
const DELETE_USER = 'https://us-central1-puntos-capstone2017.cloudfunctions.net/deleteUser';

export const businessFormUpdate = ({ prop, value }) => {
  return {
    type: BUSINESS_SIGNUP_UPDATE,
    payload: { prop, value }
  };
};

export const businessSignUpReset = (dispatch) => {
  return {
    type: BUSINESS_SIGNUP_RESET
  };
};

export const businessSignUp = (props) => {
      return (dispatch) => {
      dispatch({ type: SIGNUP_BUSINESS });
      firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
            .then((user) => {
              user.sendEmailVerification().then(() => {
                firebase.database().ref(`/users/${user.uid}`)
                .set(props)
                  .then((response) => {
                    signUpBusinessSuccess(dispatch);
                    dispatch({ type: BUSINESS_SIGNUP_RESET });
                    Actions.signUpSuccessBusiness();});
              }).catch(()=>{
                signUpBusinessFail(dispatch, 'Could not send verification email. Try Again.');
                axios.get(DELETE_USER+`?uid=${user.uid}`);
              });}).catch((response) => {
              if( response.code === 'auth/invalid-email'){
                signUpBusinessFail(dispatch, 'Invalid Email')
            }
            else {
              signUpBusinessFail(dispatch, 'Email Already Registered')
            }
            });
        };
      };

const signUpBusinessFail = (dispatch, error) => {
  dispatch({ type: BUSINESS_SIGNUP_UPDATE, payload: { prop: 'step', value: 1 }});
  dispatch({ type: SIGNUP_BUSINESS_FAIL, payload: error });
};

const signUpBusinessSuccess = (dispatch, user) => {
  dispatch(
    { type: SIGNUP_BUSINESS_SUCCESS, payload: user }
  );
};
