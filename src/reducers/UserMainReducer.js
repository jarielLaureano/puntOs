import { USER_MAIN_UPDATE, USER_MAIN_SET_PROFILE } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    birthdate: '2017-01-01',
    hometown: '',
    loading: '',
    error: '',
    telephone: '',
    user: null,
    type: 'user',
    userProfileState: {tab_selected: 'CheckIns'},
    uid: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_MAIN_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_MAIN_SET_PROFILE:
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
    default:
      return state;
  }
};
