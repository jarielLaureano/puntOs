import {
  USER_MAIN_UPDATE,
  USER_PROFILE_UPDATE,
  USER_CHECKINS_UPDATE,
  USER_REVIEWS_UPDATE,
  USER_MAIN_SET_PROFILE } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    birthdate: '2017-01-01',
    hometown: '',
    loading: '',
    error: '',
    telephone: '',
    user: {},
    type: 'user',
    uid:'',
    checkins: {},
    coupons: {},
    reviews: {},
    userProfileState: { tab_selected: 'Checkins' }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_MAIN_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_PROFILE_UPDATE:
    {
      const new_state = { ...state.userProfileState, [action.payload.prop]: action.payload.value };
      return { ...state, userProfileState: new_state};
    }
    case USER_REVIEWS_UPDATE:
      const new_reviews = { ...state.reviews, ...action.payload };
      return { ...state, reviews: new_reviews };
    case USER_CHECKINS_UPDATE:
      const new_checkins = { ...state.checkins, ...action.payload };
      return { ...state, checkins: new_checkins };
    case USER_MAIN_SET_PROFILE:
    {
      const new_state = {
        ...state,
        name: action.payload.user.name,
        birthdate: action.payload.user.birthdate,
        email: action.payload.user.email,
        hometown: action.payload.user.hometown,
        telephone: action.payload.user.telephone,
        password: action.payload.user.password,
        user: action.payload.user,
        uid: action.payload.uid
      }
      return new_state;
    }
    default:
      return state;
  }
};
