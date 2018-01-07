import firebase from 'firebase';
import { Alert } from 'react-native';
import {
  USER_MAIN_UPDATE,
  USER_PROFILE_UPDATE,
  USER_MAIN_SET_PROFILE,
  USER_CHECKINS_UPDATE,
  USER_REVIEWS_UPDATE,
  USER_PROMOS_UPDATE,
  USER_PRIMARY_FILTER_UPDATE,
  USER_SECONDARY_FILTER_UPDATE,
  USER_SOCIALS_UPDATE,
  SET_PROFILE_UPDATE,
  LOGIN_USER_SUCCESS } from './types';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
const levels = [1000, 2500, 3750, 5625, 8450, 12650];
const SWITCH_ACCOUNT = 'https://us-central1-puntos-capstone2017.cloudfunctions.net/switchAccount';
var Utils = require('../components/common/Utils');

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

export const userPrimaryFilterUpdate = ({ prop, value }) => {
  return {
    type: USER_PRIMARY_FILTER_UPDATE,
    payload: { prop, value }
  };
};

export const userSecondaryFilterUpdate = ({ prop, value }) => {
  return {
    type: USER_SECONDARY_FILTER_UPDATE,
    payload: { prop, value }
  };
};

export const getCheckins = (uid) => {
  return (dispatch) => {
    //firebase.database().ref(`/Reviews`).orderByChild(`businessID`).equalTo(uid).on('value', snapshot => {
    //console.log(uid);
    firebase.database().ref(`/Checkins`).orderByChild(`uid`).equalTo(uid).once('value', snapshot => {
      //console.log(snapshot.val());
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

export const userMainSetProfile = ({user, uid}) => {
  return {
    type: USER_MAIN_SET_PROFILE,
    payload: {user, uid}
  };
}

export const userSetExpired = (pid) => {
  return (dispatch) => {
    firebase.database().ref(`/Coupons/${pid}`).update({expired: true});
  };
};


export const userGetPromos = (uid, pf, sf) => {
  return (dispatch) => {
    if (pf == 'Promos') {
      if (sf == 'All') {
        firebase.database().ref(`/posts`).on('value', snapshot => {
          let promoList = [];
          let counter = 0;
          snapshot.forEach(child_node => {
            var child_key = child_node.key;
            promoList.splice(0,0,{ ...child_node.val(), id: counter, pid: child_key});
            counter++;
          });
          dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
        });
      }
      else {
        firebase.database().ref(`/posts`).orderByChild(`category`).equalTo(sf).on('value', snapshot => {
          let promoList = [];
          let counter = 0;
          snapshot.forEach(child_node => {
            var child_key = child_node.key;
            promoList.splice(0,0,{ ...child_node.val(), id: counter, pid: child_key});
            counter++;
          });
          //console.log(promoList)
          dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
        });
      }
    }

    else {
      if (sf == 'All') {
        firebase.database().ref(`/Coupons`).on('value', snapshot => {
          let couponList = [];
          let counter = 0;
          snapshot.forEach(child_node => {
            var child_key = child_node.key;
            couponList.splice(0,0,{ ...child_node.val(), id: counter, isCoupon: true, pid: child_key});
            counter++;
          });
          //console.log(promoList)

          dispatch({ type: USER_PROMOS_UPDATE, payload: couponList});
        });
      }
      else {
        firebase.database().ref(`/Coupons`).orderByChild(`category`).equalTo(sf).on('value', snapshot => {
          let couponList = [];
          let counter = 0;
          snapshot.forEach(child_node => {
            var child_key = child_node.key;
            couponList.splice(0,0,{ ...child_node.val(), id: counter, isCoupon: true, pid: child_key});
            counter++;
          });
          //console.log(promoList)
          dispatch({ type: USER_PROMOS_UPDATE, payload: couponList});
        });
      }
    }
  }
}

export const checkin = (user_id, businessID, username) => {
  return (dispatch) => {navigator.geolocation.getCurrentPosition(
  (position) => {
    const req_url = 'https://us-central1-puntos-capstone2017.cloudfunctions.net/checkIn?uid=' + user_id + '&bid=' + businessID + '&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude + '&username=' + username ;
    axios.get(req_url)
      .then(response => {
        if( response.data.checkedIn){
         dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'checkinError', value: '' }});
         dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'checkin', value: false }});
         Actions.UserCheckinResult();
      } else {
         dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'checkinError', value: response.data.message } });
         dispatch({ type: USER_MAIN_UPDATE, payload: { prop: 'checkin', value: false}});
         Actions.UserCheckinResult();
      }
    });})
  };
};


export const userLikeItem = (uid, pid, isCoupon) => {
  const like_obj = {[uid]: 1};
  if (isCoupon){
    return (dispatch) => {
      firebase.database().ref(`/Coupons/${pid}`).child('likedBy').update(like_obj).catch((error) => {
      Alert.alert('Could not process like at this time', 'Sorry', {text: 'OK'});
    });};
  } else {
  return (dispatch) => {
    firebase.database().ref(`/posts/${pid}`).child('likedBy').update(like_obj).catch((error) => {
    Alert.alert('Could not process like at this time', 'Sorry', {text: 'OK'});
  });};}

};

export const userUnlikeItem = (uid, pid, isCoupon) => {
  if(isCoupon){
    return (dispatch) => {
      firebase.database().ref(`/Coupons/${pid}`).child('likedBy').child(uid).remove().catch((error) => {
      Alert.alert('Could not process unlike at this time', 'Sorry', {text: 'OK'});
    });};
  }else {
  return (dispatch) => {
    firebase.database().ref(`/posts/${pid}`).child('likedBy').child(uid).remove().catch((error) => {
    Alert.alert('Could not process unlike at this time', 'Sorry', {text: 'OK'});
  });};}
};

export const getSocialPosts = () => {
  return (dispatch) => {
    let socialList =[];
    firebase.database().ref(`/Events`).on('value', snapshot =>  {
      let counter = 0;
      snapshot.forEach(child_node => {
        var child_key = child_node.key;
        socialList.splice(0,0,{ ...child_node.val(), id: counter, isCoupon: true, pid: child_key});
        counter++;
      });
      socialList = sortObj(socialList, 'date');
      socialList.reverse();
      dispatch({ type: USER_SOCIALS_UPDATE, payload: socialList});
    });
  };
};

export const switchAccountUser = (email, password) => {
  return (dispatch) => {
  dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'switchLoading', value: true}});
  const req_url = SWITCH_ACCOUNT+'?email='+email+'&password='+password;
  axios.get(req_url)
    .then(response => {
      const data = response.data;
      if(data.success){
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            dispatch(
              { type: LOGIN_USER_SUCCESS, payload: user }
            );
            dispatch(
              { type: SET_PROFILE_UPDATE, payload: { prop: 'uid', value: user.uid } }
            );
            dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'switchLoading', value: false}});
            Actions.settingProfile({type: 'reset'});
          }).catch((error) => {
            console.log(error)
          });
        //Alert.alert('Account Unlinked!',data.message,{text: 'OK'});
      } else{
        dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'switchLoading', value: false}});
        dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'switchPassword', value: ''}});
        Alert.alert('Unable to Switch!',data.message, {text: 'OK'});
      }
  });
};
};

export const getStats = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/userRewards/${uid}`).on('value', pointsObj => {
      var db_level = 0;
      firebase.database().ref(`/users/${uid}`).once('value', user=>{
        db_level = user.val().level;
      });
      const rewards = pointsObj.val();
      var accumulated = 0;
      console.log('died here')
      if(rewards){
      if(rewards.hasOwnProperty('points')){
        accumulated = rewards.points;
      }
    }
      //console.log('points: ' + accumulated)
      dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'overallPoints', value: accumulated}});
      for(var i=0; i<levels.length; i++){
        if(accumulated>=levels[i] && accumulated<levels[i+1]){
          var current_level = i+1;
          dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'level', value: current_level }});
          //console.log('db level:' + db_level)
          //console.log('local level: ' + current_level)
          if(current_level != db_level){
            firebase.database().ref(`/users/${uid}`).once('value', user => {
              user.ref.update({level: current_level});
            }).then(()=>{
              Alert.alert('Level Up!','You are now in level'+current_level, {text: 'OK'});
            });}
          const percentage = (((accumulated - levels[i])/(levels[i+1]-levels[i]))*100).toFixed(0);
          dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'levelPercentage', value: percentage }});
          const remaining = (levels[i+1]-levels[i])-(accumulated - levels[i]);
          dispatch({ type: USER_MAIN_UPDATE, payload: {prop: 'pointsToNext', value: remaining }});
          return;
          }
        }
      });
    };
  };

export const getMyCheckins = (uid) => {
    return (dispatch) => {
      firebase.database().ref(`/Checkins/`).orderByChild('uid').equalTo(uid).on('value', snapshot => {
        let checkinList = [];
        let counter = 0;
        snapshot.forEach(child_node => {
          var child_key = child_node.key;
          checkinList.splice(0,0,{...child_node.val(), id: counter, key: child_key});
          counter++;
        });
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'totalCheckins', value: Object.keys(checkinList).length}});
        var shortList = checkinList.slice(0,3);
        //console.log(shortList)
        shortList.forEach( checkin => {
          const businessID = checkin.businessID;
          var image = '';
          firebase.database().ref(`/users/${businessID}`).once('value', snapshot =>{
            if(snapshot.val().image){
              image = snapshot.val().image;
            }
            checkin['image'] = image;
          });
        });
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'lastCheckins', value: shortList}});
      });
    };
};

export const getMyCoupons = (uid) => {
    return (dispatch) => {
      firebase.database().ref(`/Redeems/`).orderByChild('uid').equalTo(uid).on('value', snapshot => {
        let couponList = [];
        let counter = 0;
        snapshot.forEach(child_node => {
          var child_key = child_node.key;
          couponList.splice(0,0,{...child_node.val(), id: counter, key: child_key});
          counter++;
        });
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'totalCoupons', value: Object.keys(couponList).length}});
        //console.log(shortList)
        couponList.forEach( coupon => {
          const couponID = coupon.couponID;
          var image = '';
          firebase.database().ref(`/Coupons/${couponID}`).once('value', snapshot =>{
            if(snapshot.val().icon){
              image = snapshot.val().icon;
            }
            coupon['image'] = image;
            coupon['businessName'] = snapshot.val().name;
            coupon['text'] = snapshot.val().text;
          });
        });
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'my_coupons', value: couponList}});
        var shortList = couponList.slice(0,3);
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'lastCoupons', value: shortList}});
        //console.log('shortList: ')
        //console.log(shortList)
      })
    };
};

export const getMyReviewCount = (uid) => {
    return (dispatch) => {
      firebase.database().ref(`/Reviews/`).orderByChild('uid').equalTo(uid).on('value', snapshot => {
        let reviewList = [];
        let counter = 0;
        snapshot.forEach(child_node => {
          var child_key = child_node.key;
          reviewList.splice(0,0,{...child_node.val(), id: counter, key: child_key});
          counter++;
        });
        dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'totalReviews', value: Object.keys(reviewList).length}});
      });
    };
  };

export const updateUserProfilePic = (image_path, uid) =>{
  return (dispatch) => {
    dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'uploadLoading', value: true}});
    dispatch({type: USER_MAIN_UPDATE, payload: {prop: 'uploadError', value: ''}});
    const _today = new Date().getTime();
    Utils.uploadImage(image_path, `${_today+uid}.jpg` ).then((response) => {
      firebase.database().ref(`/users/${uid}`).update({image: response}).then(()=>{
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'uploadLoading', value: false}});
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'showPhotos', value: false}});
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'photoSelected', value: null}});
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'photoSelectedKey', value: null}});
      }).catch((error)=>{
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'uploadLoading', value: false}});
        dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'uploadError', value: 'Could not upload image.'}});
      });

  }).catch((error)=>{
    dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'uploadLoading', value: false}});
    dispatch({type: USER_MAIN_UPDATE, payload:{prop: 'uploadError', value: 'Could not upload image.'}});
  });
};
};

function sortObj(list, key) {
  function compare(a, b) {
      a = a[key];
      b = b[key];
      var type = (typeof(a) === 'string' ||
                  typeof(b) === 'string') ? 'string' : 'number';
      var result;
      if (type === 'string') result = a.localeCompare(b);
      else result = a - b;
      return result;
  }
  return list.sort(compare);
}
