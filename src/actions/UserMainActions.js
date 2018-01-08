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
  GET_FOLLOWING,
  LOGIN_USER_SUCCESS, 
  LEADERBOARD_UPDATE} from './types';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
const SWITCH_ACCOUNT = 'https://us-central1-puntos-capstone2017.cloudfunctions.net/switchAccount';

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
  console.log("changing primary filter")
  return {
    type: USER_PRIMARY_FILTER_UPDATE,
    payload: { prop, value }
  };
};

export const userSecondaryFilterUpdate = ({ prop, value }) => {
  console.log("changing secondary filter")
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

export const getPromosCoupons = (uid) => {
  return (dispatch) => {


  };
};

//---------------------------------------------------------------//
//                      FEED QUERY & FILTER                      //
//---------------------------------------------------------------//
export const userGetPromos = (uid, pf, sf, fol) => {
  return (dispatch) => {
    //console.log(pf + " " + sf);
    //console.log("At userGetPromos Action");

    //FILTERING BY PROMOTIONS
    if (pf == 'Promos') {
      //NO FILTER
      if (sf == 'All') {
        firebase.database().ref(`/posts`).on('value', snapshot => {
          let promoList = [];
          let counter = 0;
          snapshot.forEach(child_node => {
            var child_key = child_node.key;
            promoList.splice(0,0,{ ...child_node.val(), id: counter, pid: child_key});
            counter++;
          });
          //console.log(promoList)
          //console.log("Dispatching Promos...");
          dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
        });
      }
      else {
        //FILTERING BY FAVORITES(FOLLOWS)
        if (sf == 'Favorites') {
          firebase.database().ref(`/posts`).on('value', snapshot => {
            let promoList = [];
            let counter = 0;
            snapshot.forEach(child_node => {
              var child_key = child_node.key;
              console.log('Looking at filtering by favorites...-----------');
              console.log(fol);
              console.log(child_node.val().businessID);
              if (child_node.val().businessID in fol) {
                promoList.splice(0,0,{ ...child_node.val(), id: counter, pid: child_key});
                counter++;
              }
            });
            //console.log(promoList)
            //console.log("Dispatching Promos...");
            dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
          });
        }
        //FILTERING BY LOCATION
        else if (sf == 'Location') {
          console.log('Filtering by location...');
          userGetPromosByLocation(uid, pf, sf, fol);
        }
        //FILTER BY CATEGORY
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
    }

    //FILTERING BY COUPONS
    else {
      //NO FILTER
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
          //console.log("Dispatching Coupons...");
          dispatch({ type: USER_PROMOS_UPDATE, payload: couponList});
        });
      }
      //FILTER BY CATEGORY
      else {
        //FILTERING BY FAVORITES(FOLLOWS)
        if (sf == 'Favorites') {
          firebase.database().ref(`/Coupons`).on('value', snapshot => {
            let promoList = [];
            let counter = 0;
            snapshot.forEach(child_node => {
              var child_key = child_node.key;
              console.log('Looking at filtering by favorites...-----------');
              console.log(fol);
              console.log(child_node.val().businessID);
              if (child_node.val().businessID in fol) {
                promoList.splice(0,0,{ ...child_node.val(), id: counter, isCoupon: true, pid: child_key});
                counter++;
              }
            });
            //console.log(promoList)
            //console.log("Dispatching Promos...");
            dispatch({ type: USER_PROMOS_UPDATE, payload: promoList});
          });
        }
        //FILTERING BY LOCATION
        else if (sf == 'Location') {

        }
        //
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
}

//Filter promos by user location, locations near user first
export const userGetPromosByLocation = (uid, pf, sf, fol) => {

  console.log('at user get promos by location');

  return (dispatch) => 
  {
    navigator.geolocation.getCurrentPosition( 
      (position) => {
      console.log("Getting user location...");
      console.log('Getting User lat...');
      var lat1 = position.coords.latitude; //user latitude
      console.log('User lat ' + lat1);
      console.log('Getting User long...');
      var lon1 = position.coords.longitude; //user longitude
      console.log('User long ' + lon1);
    });

    /*console.log('User Location OK');
    console.log('Entering user get promos by location');
    firebase.database().ref(`/users`).on('value', snapshot => {
      var businessList = [];
      var counter = 0;
      snapshot.forEach(child_node => {
        var child_key = child_node.key;
        var business = child_node.val();
        var lat2 = 0; //business latitude
        var lon2 = 0; //business longitude
        if (business.type == 'business') {
          counter++;
          businessList.splice(0,0,{...business});
          lat2 = business.latitude;
          lon2 = business.longitude;
          console.log('business lat ' + lat2);
          console.log('business long ' + lon2);
          var R = 6371e3; // metres
          var φ1 = lat1.toRadians();
          var φ2 = lat2.toRadians();
          var Δφ = (lat2-lat1).toRadians();
          var Δλ = (lon2-lon1).toRadians();
          var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          console.log('distance from business: ' + d);
          businessList.splice(0,0,{ ...child_node.val(), id: counter, pid: child_key, disFromUser: d});
        }
      });
      dispatch({ type: USER_PROMOS_UPDATE, payload: businessList });

        /*firebase.database().ref(`posts/`).on('value', snapshot2 => {
          let promoList = [];
          let counter2 = 0;
          snapshot2.forEach(child_node2 => {
            counter2++;
            for (var i = 0, l = businessList.length; i < l; i++) {
              var obj = businessList[i];
              if ( child_node2.val().businessID === obj.businessID) {
                promoList.splice(0,0,{ ...child_node2.val(), id: counter2, dfu: obj.disFromUser})
              }
            }
          })
          console.log('list before sorting by distance from usr: ' + promoList);
          promoList = sortObj(promoList, 'dfu');
          console.log('list after sorting by distance from usr ' + promoList);
          dispatch({ type: USER_PROMOS_UPDATE, payload: promoList });
        })*/
    };
  }

//---------------------------------------------------------------//
//                                                               //
//---------------------------------------------------------------//

export const checkin = (user_id, businessID) => {
  return (dispatch) => {navigator.geolocation.getCurrentPosition(
  (position) => {
    const req_url = 'https://us-central1-puntos-capstone2017.cloudfunctions.net/checkIn?uid=' + user_id + '&bid=' + businessID + '&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude;
    console.log(req_url)
    axios.get(req_url)
      .then(response => {
        if( response.data.checkedIn){
        Alert.alert('Checked In!', 'You Successfully checked in to ' + response.data.businessName + '. Points: '+response.data.pointsEarned, {text: 'OK'});
      } else {
        Alert.alert('Error!', response.data.message, {text: 'OK'});
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
      console.log(socialList);
      dispatch({ type: USER_SOCIALS_UPDATE, payload: socialList});
    });
  };
};

export const getLeaderboard = () => {
  return (dispatch) => {
    let leaderList = [];
    firebase.database().ref(`/users`).orderByChild(`points`).on('value', snapshot => {
      let counter = 0;
      snapshot.forEach(child_node => {
        var child_key = child_node.key;
        if (child_node.val().type == 'user') {
          counter++;
          leaderList.splice(0,0,{...child_node.val()});
        }
      });
      leaderList = sortObj(leaderList, 'points');
      leaderList.reverse();
      console.log("Leaderboard list:");
      console.log(leaderList);
      dispatch({ type: LEADERBOARD_UPDATE, payload: leaderList });
    });
  };
};

export const getFollowing = (uid) => {
  return (dispatch) => {
    //console.log('running it get following - inside action')
    let followingList = {};
    firebase.database().ref(`/users/${uid}/following`).on('value', snapshot => {
      //console.log('following list-------------');
      followingList = snapshot.val();
      //console.log('The following list at action: ' + followingList);
      dispatch({ type: GET_FOLLOWING, payload: followingList });
    });
  };
};

export const userFollowBusiness = (uid, bid, bname, bicon) => {
  var imgToUse = bicon;
  if (!bicon) {
    imgToUse = '';
  }
  const like_obj = {[bid]: {['name']: bname, ['icon']: imgToUse}};
  console.log('The like object: ' + like_obj);
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}`).child('following').update(like_obj).catch((error) => {
      Alert.alert('Could not process follow at this time', 'Sorry', {text: 'OK'});
    });
  };
};

export const userUnfollowBusiness = (uid, bid) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}`).child('following').child(bid).remove().catch((error) => {
      Alert.alert('Could not process unfollow at this time', 'Sorry', {text: 'OK'});
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
