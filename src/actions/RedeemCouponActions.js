import firebase from 'firebase';
import { SET_COUPON_PROFILE, CLAIM_COUPON, UPDATE_COUPON_PROFILE } from './types'
import { Actions } from 'react-native-router-flux';

export const setCouponProfile = (coupon) => {
    return {
        type: SET_COUPON_PROFILE,
        payload: coupon
    };
}

export const updateCouponProfile = ({ prop, value }) => {
    return {
        type: UPDATE_COUPON_PROFILE,
        payload: { prop, value }
    }
}

export const claimCoupon = (props) => {
    return (dispatch) => {
        dispatch({ type: CLAIM_COUPON});
    };
}