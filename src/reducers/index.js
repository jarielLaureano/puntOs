import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusinessSignUpReducer from './BusinessSignUpReducer';
import SettingProfileReducer from './SettingProfileReducer';
import UserSignUpReducer from './UserSignUpReducer';
import BusinessMainReducer from './BusinessMainReducer';
import PostDetailReducer from './PostDetailReducer';
import LikeDetailsReducer from './LikeDetailsReducer';
import UserMainReducer from './UserMainReducer';
import PostReviewReducer from './PostReviewReducer'

export default combineReducers({
  auth: AuthReducer,
  businessSignUp: BusinessSignUpReducer,
  profileSet: SettingProfileReducer,
  userSignUp: UserSignUpReducer,
  businessMain: BusinessMainReducer,
  postDetails: PostDetailReducer,
  userMain: UserMainReducer,
  likeDetails: LikeDetailsReducer,
  postReview: PostReviewReducer
});
