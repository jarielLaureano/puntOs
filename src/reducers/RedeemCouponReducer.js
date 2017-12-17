import { CLAIM_COUPON, SET_COUPON_PROFILE, UPDATE_COUPON_PROFILE} from '../actions/types';

const INITIAL_STATE = {
    coupon: {},
    loading: false,
    message: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SET_COUPON_PROFILE:
        return { ...state, coupon: action.payload };
        case CLAIM_COUPON:
        return { ...state, loading: true, message: '' };
        case UPDATE_COUPON_PROFILE:
        return { ...state, [action.payload.prop]: action.payload.value };
        default:
        return state;
    }
};

