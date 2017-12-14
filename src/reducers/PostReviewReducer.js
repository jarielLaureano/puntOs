import {
SUBMIT_REVIEW,
POST_REVIEW_CHANGE
} from '../actions/types';


const INITIAL_STATE = {
    businessID: 'za47V9Z8DqVPampPGTa0of0Aojy1',
    date: '',
    text: '',
    rating: 0,
    caption: '',
    uid: 'zttXtdJ4KMT7eor77y0CFDQGLpO2',
    username: 'Jariel Laureano',
    image: 'http://rec-eph.gfrcdn.net/images/2016/04/12/capture_7.jpg',
    loading: false,
    error: ''
};

export default ( state=INITIAL_STATE, action ) => {
    console.log(action);
    switch(action.type){
        case SUBMIT_REVIEW:
            return { ...state, loading: true};
        case POST_REVIEW_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value }
        default:
        return state;
    }
};