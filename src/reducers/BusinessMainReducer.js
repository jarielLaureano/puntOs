import { BUSINESS_MAIN_UPDATE } from '../actions/types';

const INITIAL_STATE = {
user: {},
coupons: {},
reviews: {},
promos: {},
scene: 'home',
metrics: {},
uid: '',
coupon_count: 0,
checkin_count: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSINESS_MAIN_UPDATE:
      //action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
