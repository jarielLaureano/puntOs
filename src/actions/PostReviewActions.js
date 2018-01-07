import firebase from 'firebase';
import {
    SUBMIT_REVIEW,
    POST_REVIEW_CHANGE,
    RESET_POST_REVIEW
} from './types';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export const postReviewChange = ({ prop, value }) =>{
    return {
        type: POST_REVIEW_CHANGE,
        payload: { prop, value }
    };
};

export const submitReview = (props) => {
    return (dispatch) => {
        dispatch({ type: POST_REVIEW_CHANGE, payload: { prop:'loading', value: true }});
        const today = new Date();
        const date = today.toISOString();
        dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'date', value: date }});
        props.date= date;
        firebase.database().ref(`/Reviews/`)
            .push(props)
                .then((response) => {
                    dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'loading', value: false} });
                    dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'error', value: ''}});
                })
                .catch((error) => {
                    dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'error', value: error}});
                })
    };
}

export const resetPostReview = () =>{
    return {
        type: RESET_POST_REVIEW
    }
}

export const givePointsForReview = (uid, user) => {
    return (dispatch) => {
        var result = user.points + 100;
        firebase.database().ref(`users/${uid}`).update({points: result})
        .then(() => {
            firebase.database().ref(`userRewards/${uid}`).once('value', snapshot => {
                var entry = snapshot.val();
                snapshot.ref.update({points: entry.points+100 })
                    .catch((error) => {
                        dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'error', value: error }});
                    })
            }).catch((error) => {
                dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'error', value: error }});
            });
        })
        .catch((error) => {
                dispatch({ type: POST_REVIEW_CHANGE, payload: { prop: 'error', value: error }});
        });
    };
}





