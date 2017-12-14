import {
    LIKE_DETAIL_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    likes: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LIKE_DETAIL_UPDATE:
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};