import firebase from 'firebase';
import { USER_MAIN_UPDATE, USER_PROFILE_UPDATE, USER_CHECKINS_UPDATE, USER_REVIEWS_UPDATE } from './types';
import { Actions } from 'react-native-router-flux';

export const userMainUpdate = ({ prop, value }) => {
  return {
    type: USER_MAIN_UPDATE,
    payload: { prop, value }
  };
};

export const getUserProfile = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}`).on('value', snapshot => {
      const user = snapshot.val();
      dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'user', value: user }});
    });
  };
};

export const userProfileUpdate = ({ prop, value }) => {
  return {
    type: USER_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const getCheckins = (uid) => {
  return (dispatch) => {
    //firebase.database().ref(`/Reviews`).orderByChild(`businessID`).equalTo(uid).on('value', snapshot => {
    console.log(uid);
    firebase.database().ref(`/Checkins`).orderByChild(`uid`).equalTo(uid).once('value', snapshot => {
      console.log(snapshot.val());
      let checkinList = [];
      let counter = 0;
      snapshot.forEach(child_node => {
        checkinList.push({...child_node.val(), id: counter});
        counter++;
      });
      dispatch({ type: USER_CHECKINS_UPDATE, payload: checkinList});
    });
  };
};

export const getMyReviews = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/Reviews`).orderByChild(`uid`).equalTo(uid).on('value', snapshot => {
      let reviewList = [];
      let counter = 0;
      snapshot.forEach(child_node => {
        reviewList.push({...child_node.val(), id: counter});
        counter++;
      });
      //console.log(reviewList)
      dispatch({ type: USER_REVIEWS_UPDATE, payload: reviewList});
    });
  };
};