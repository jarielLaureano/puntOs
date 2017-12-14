import firebase from 'firebase';

export const userLikePost = (uid, pid) => {
    return (dispatch) => {
        firebase.database().ref(`/posts/${pid})/likedBy`).set({ uid : 1});
    };
};

export const userUnlikePost = (uid, pid) => {
    return (dispatch) => {
        firebase.database().ref(`/posts/${pid})/likedBy/${uid}`).remove();
    };
};