import { SET_PROFILE_UPDATE, GETTING_PROFILE, ACCOUNT_NOT_ACTIVE } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  uid: '',
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE_UPDATE: {
      console.log(action.payload.value)
      //action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    }
    case GETTING_PROFILE:
        return { ...state, loading: true, error: '' };
    case ACCOUNT_NOT_ACTIVE:
        return { ...state, loading: false, error: 'Your Business Account is not Active.'}
    default:
      return state;
  }
};
