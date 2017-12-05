import { BUSINESS_SIGNUP_UPDATE, SIGNUP_BUSINESS, SIGNUP_BUSINESS_FAIL, SIGNUP_BUSINESS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  businessName: '',
  username: '',
  addressLine: '',
  city: '',
  country: '',
  zipCode: '',
  phoneNumber: '',
  email: '',
  password: '',
  gMaps: false,
  error: '',
  loading: '',
  step: 1
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSINESS_SIGNUP_UPDATE:
      //action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case SIGNUP_BUSINESS:
        return { ...state, loading: true, error: '' };
    case SIGNUP_BUSINESS_SUCCESS:
        return { ...state, ...INITIAL_STATE, user: action.payload , error: ''};
    case SIGNUP_BUSINESS_FAIL:
        return { ...state, error: 'Email Already Registered', loading: false, password: '' };
    default:
      return state;
  }
};
