import firebase from 'firebase';
import { Alert } from 'react-native';
import { BUSINESS_MAIN_UPDATE, VALIDATE_STATE_UPDATE, CREATE_PROMO_UPDATE, CREATE_COUPON_UPDATE,
  CREATE_COUPON_RESET, REVIEWS_UPDATE, BUSINESS_PROFILE_UPDATE } from './types';
import { Actions } from 'react-native-router-flux';
var moment = require('moment');

export const businessMainUpdate = ({ prop, value }) => {
  return {
    type: BUSINESS_MAIN_UPDATE,
    payload: { prop, value }
  };
};

export const validateStateUpdate = ({ prop, value }) => {
  return {
    type: VALIDATE_STATE_UPDATE,
    payload: { prop, value }
  };
};

export const createPromoStateUpdate = ({ prop, value }) => {
  return {
    type: CREATE_PROMO_UPDATE,
    payload: { prop, value }
  };
};

export const createCouponStateUpdate = ({ prop, value }) => {
  return {
    type: CREATE_COUPON_UPDATE,
    payload: { prop, value }
  };
};

export const businessProfileUpdate = ({ prop, value }) => {
  return {
    type: BUSINESS_PROFILE_UPDATE,
    payload: { prop, value }
  };
};

export const getBusinessProfile = (uid) => {
      return (dispatch) => {
      firebase.database().ref(`/users/${uid}`).on('value', snapshot => {
        const user = snapshot.val();
        dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'user', value: user }});
      });
        };
      };

export const getReviews = (uid) => {
  return (dispatch) => {
    //firebase.database().ref(`/Reviews`).orderByChild(`businessID`).equalTo(uid).on('value', snapshot => {
    firebase.database().ref(`/Reviews`).orderByChild(`businessID`).on('value', snapshot => {
      let reviewList = [];
      let counter = 0;
      snapshot.forEach(child_node => {
        reviewList.push({...child_node.val(), id: counter});
        counter++;
      });
      //console.log(reviewList)
      dispatch({ type: REVIEWS_UPDATE, payload: reviewList});
  });
};
};

export const getCheckinsToday = (uid) => {
      return (dispatch) => {
      const _today = new Date().toISOString().substring(0,10);
      firebase.database().ref(`/Checkins/${uid}`).orderByChild(`date`).equalTo(_today).on('value', snapshot => {
        const checkins_today = snapshot.val();
        if (checkins_today != null){
        dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'checkin_count', value: Object.keys(checkins_today).length }});
      }
        //dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'user', value: user }});
      });
        };
      };

export const getCouponsToday = (uid) => {
      return (dispatch) => {
      const _today = new Date().toISOString().substring(0,10);
      firebase.database().ref(`/Redeems/${uid}`).orderByChild(`date`).equalTo(_today).on('value', snapshot => {
        const coupons_today = snapshot.val();
        if ( coupons_today != null){
        dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'coupon_count', value: Object.keys(coupons_today).length }});
      }
        //dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'user', value: user }});
      });
        };
      };

export const createPromo = (promo_text, promo_media, business_name, uid) => {
  return (dispatch) => {
    dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'loading', value: true }});
    dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'error', value: '' }});
    firebase.database().ref(`/posts`).once('value', snapshot => {
    const _today = new Date().toISOString();
    const new_post = { text: promo_text, image: promo_media, businessID: uid, date: _today, name: business_name, icon: '', likedBy: '', sharedBy: '' };
    snapshot.ref.push(new_post).then(() => {
      dispatch({ type: CREATE_PROMO_UPDATE, payload: {prop: 'loading', value: false}});
      Alert.alert('Promotion Posted!','', {text: 'OK'})
      dispatch({ type: CREATE_PROMO_UPDATE, payload: {prop: 'promo_text', value: ''}})
      dispatch({ type: CREATE_PROMO_UPDATE, payload: {prop: 'promo_media', value: ''}})
    }).catch((error) => {
      dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'loading', value: false }});
      dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'error', value: 'Could not post promotion' }});
    })}).catch((error) => {
      dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'loading', value: false }});
      dispatch({ type: CREATE_PROMO_UPDATE, payload: { prop: 'error', value: 'Could not access data' }});
    });
  };
};

export const createCoupon = (coupon_state, business_name, uid) => {
  return (dispatch) => {
    dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'loading', value: true }});
    dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'error', value: '' }});
    firebase.database().ref(`/Coupons`).once('value', snapshot => {
    const _today = new Date();
    const post_date = _today.toISOString();
    //console.log(post_date.toISOString())
    let expiration_date = new Date();
    if( coupon_state.coupon_expiration_type === 'minutes'){
        expiration_date = moment(expiration_date).add(coupon_state.coupon_expiration, 'm');
    } else if( coupon_state.coupon_expiration_type === 'hours'){
        expiration_date = moment(expiration_date).add(coupon_state.coupon_expiration, 'h');
    } else if( coupon_state.coupon_expiration_type === 'days') {
        expiration_date = moment(expiration_date).add(coupon_state.coupon_expiration, 'd');
    }
    const expire_coupon = expiration_date.toISOString();
    const new_coupon = { text: coupon_state.coupon_text , image: coupon_state.coupon_media , businessID: uid,
      date: post_date, businessName: business_name, icon: 'null', likedBy: 'null', sharedBy: 'null', expires: expire_coupon, expired: false,
      pointsValue: coupon_state.points_value, title: coupon_state.coupon_title, claimLimit: coupon_state.claim_limit };
    snapshot.ref.push(new_coupon).then(() => {
      dispatch({ type: CREATE_COUPON_UPDATE, payload: {prop: 'loading', value: false}});
      Alert.alert('Coupon Posted!','Coupon will expire on ' + expire_coupon.substring(0,10) + ' at ' + expire_coupon.substring(11,16), {text: 'OK'})
      dispatch({ type: CREATE_COUPON_RESET });
    }).catch((error) => {
      dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'loading', value: false }});
      dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'error', value: 'Could not post coupon' }});
    });}).catch((error) => {
      dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'loading', value: false }});
      dispatch({ type: CREATE_COUPON_UPDATE, payload: { prop: 'error', value: 'Could not access data' }});
    });
  };
};

export const validateCoupon = (coupon_code, uid) => {
  return (dispatch) => {
  dispatch({ type: VALIDATE_STATE_UPDATE, payload: { prop: 'loading', value: true }});
  dispatch({ type: VALIDATE_STATE_UPDATE, payload: { prop: 'error', value: '' }});
  firebase.database().ref(`/Redeems/${uid}`).orderByChild(`code`).equalTo(coupon_code).once('value', snapshot => {
    let redeemObj = '';
    let redeem_id = '';
    let coupon_id = '';
    snapshot.forEach(child_node => {
      redeemObj = child_node.val();
      redeem_id = child_node.key;
      coupon_id = redeemObj.couponID;
    });
    if(!redeemObj){
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'loading', value: false}});
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'error', value: 'Coupon code not found'}});
    }
    else if(redeemObj.used){
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'loading', value: false}});
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'error', value: 'Coupon code already used'}});
    }
    else if(!redeemObj.used){
      snapshot.ref.child(redeem_id).update({ used: true}).then(() => {
      firebase.database().ref(`/Coupons/${uid}/${coupon_id}`).once('value', snapshot => {
        const response = snapshot.val();
        if(response) {
        const description = response.text;
        dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'loading', value: false}});
        Alert.alert('Code Verified!', description, {text: 'OK'})
        dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'code', value: ''}})
        }
        else {
          dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'loading', value: false}});
          dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'error', value: 'Coupon valid, error parsing response'}});
        }
      }
      )}).catch(() => {
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'loading', value: false}});
      dispatch({ type: VALIDATE_STATE_UPDATE, payload: {prop: 'error', value: 'Could not verify code'}});})
    }
    //dispatch({ type: BUSINESS_MAIN_UPDATE, payload: { prop: 'user', value: user }});
  });
    };

};
