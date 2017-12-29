import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, AUTH_FORM_UPDATE } from '../actions/types';

const INITIAL_STATE = { email: '', password: '', user: null, error: '', loading: false};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_FORM_UPDATE:
      //action.payload === { prop: 'email', value: 'email@gmail.com' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      //console.log(action.payload)
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, ...action.payload };
//      return { ...state, error: 'Authentication Failed', loading: false, password: '' };
    default:
      return state;
  }
};
