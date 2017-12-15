import firebase from 'firebase';
import { 
    POST_DETAIL_UPDATE,
    POST_DETAIL_FETCH
} from './types';

export const postDetailUpdate = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({ type: POST_DETAIL_UPDATE, payload: { prop: 'uid', value: currentUser.uid }});
    };
};

export const postDetailFetch = () => {
    return (dispatch) => {
        firebase.database().ref(`/posts`)
            .on('value', snapshot => {
                /*    
                let postObj = '';
                let name = '';
                let date = '';
                let text = '';
                name = snapshot.child("name").val();
                date = snapshot.child("date").val();
                text = snapshot.child("text").val();
                console.log(name);
                console.log(date);
                console.log(text);
                dispatch({ type: POST_DETAIL_FETCH, payload: { name: name, date: date, text: text} });
                */
                dispatch({ type: POST_DETAIL_FETCH, payload: snapshot.val() });
            });
    };
};