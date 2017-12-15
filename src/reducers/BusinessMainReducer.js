import { BUSINESS_MAIN_UPDATE, VALIDATE_STATE_UPDATE, CREATE_PROMO_UPDATE, CREATE_COUPON_UPDATE,
  CREATE_COUPON_RESET, REVIEWS_UPDATE, BUSINESS_PROFILE_UPDATE, PROMOS_UPDATE, COUPONS_UPDATE } from '../actions/types';

const INITIAL_STATE = {
user: {},
coupons: {},
reviews: {},
promos: {},
scene: 'home',
metrics: {},
uid: '',
coupon_count: 0,
checkin_count: 0,
validateState: { loading: false, code: '', error: ''},
createPromoState: { loading: false, promo_text: '', promo_media: '', error: '' },
createCouponState: { loading: false, coupon_text: '', coupon_media: '', coupon_expiration_type: 'minutes', coupon_expiration: 10, points_value: 50,
claim_limit: 10, coupon_title: '', expiration_max: 59, expiration_step: 10 },
businessProfileState: { tab_selected: 'Promos' }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSINESS_MAIN_UPDATE:
      //action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case VALIDATE_STATE_UPDATE:{
      const new_state = { ...state.validateState, [action.payload.prop]: action.payload.value };
      return { ...state, validateState: new_state};
    }
    case CREATE_PROMO_UPDATE:
    {
      const new_state = { ...state.createPromoState, [action.payload.prop]: action.payload.value };
      return { ...state, createPromoState: new_state};
    }
    case CREATE_COUPON_UPDATE:
    {
      const new_state = { ...state.createCouponState, [action.payload.prop]: action.payload.value };
      return { ...state, createCouponState: new_state};
    }
    case BUSINESS_PROFILE_UPDATE:
    {
      const new_state = { ...state.businessProfileState, [action.payload.prop]: action.payload.value };
      return { ...state, businessProfileState: new_state};
    }
    case CREATE_COUPON_RESET:
    {
    const new_state = INITIAL_STATE.createCouponState;
    return { ...state, createCouponState: new_state};
    }
    case REVIEWS_UPDATE:
    {
    const new_reviews = {...state.reviews, ...action.payload};
    return { ...state, reviews: new_reviews};
    }
    case PROMOS_UPDATE:
    {
    const new_promos = {...state.promos, ...action.payload};
    return { ...state, promos: new_promos};
    }
    case COUPONS_UPDATE:
    {
    const new_coupons = {...state.coupons, ...action.payload};
    return { ...state, coupons: new_coupons};
    }
    default:
      return state;
  }
};
