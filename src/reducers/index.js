import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusinessSignUpReducer from './BusinessSignUpReducer';

export default combineReducers({
  auth: AuthReducer,
  businessSignUp: BusinessSignUpReducer
});
