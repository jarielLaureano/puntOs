import {
    LIKE_POST
} from './types';

export const likePost = (post) => {
    return {
        payload: post,
        type: LIKE_POST
    };
};