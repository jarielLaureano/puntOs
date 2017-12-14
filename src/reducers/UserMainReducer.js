import { USER_MAIN_UPDATE } from '../actions/types';

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
    userProfileState: {tab_selected: 'CheckIns'}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_MAIN_UPDATE:
      //action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
