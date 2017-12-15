import {
    POST_DETAIL_UPDATE,
    POST_DETAIL_FETCH
} from '../actions/types';

const INITIAL_STATE = {
    pid: '',
    uid: '',
    icon: '',
    name: '',
    date: '',
    text: '',
    image: '',
    likedBy: {},
    isCoupon: {},
    claimedBy: {},
    sharedBy: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case POST_DETAIL_UPDATE:
            //console.log(action.payload.value);
            return { ...state, [action.payload.prop]: action.payload.value };
        case POST_DETAIL_FETCH:
            //console.log(action.payload);
            //const update = action.payload;
            //return { ...state, ...INITIAL_STATE, ...update};
            return action.payload;
        default:
            return state;
    }
};