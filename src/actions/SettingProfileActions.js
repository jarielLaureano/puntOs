import firebase from 'firebase';
import { SET_PROFILE_UPDATE, GETTING_PROFILE, ACCOUNT_NOT_ACTIVE } from './types';
import { Actions } from 'react-native-router-flux';

export const settingProfileUpdate = ({ prop, value }) => {
  return {
    type: SET_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const gettingProfile = () =>{
  return {
    type: GETTING_PROFILE
  };
};


export const getProfile = (uid) => {
  return (dispatch) => {
  dispatch({ type: GETTING_PROFILE });
    firebase.database().ref(`/users/${uid}`).once('value', snapshot => {
      const user = snapshot.val();
      if (user.type === 'Business'){
        if (user.active === '' || user.active === undefined){
          accountNotActive(dispatch);
        }
        else if (user.active){
          Actions.BusinessMain();
        }
        else {
          accountNotActive(dispatch);
        }
    } else if(user.type === 'user'){
          Actions.UserMain();
    }
    }).catch((error) => {
      console.log(error)
    });
  };
};

const accountNotActive = (dispatch, user) => {
  dispatch(
    { type: ACCOUNT_NOT_ACTIVE, payload: user }
  );
};
