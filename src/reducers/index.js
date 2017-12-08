import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BusinessSignUpReducer from './BusinessSignUpReducer';
import SettingProfileReducer from './SettingProfileReducer';

export default combineReducers({
  auth: AuthReducer,
  businessSignUp: BusinessSignUpReducer,
  profileSet: SettingProfileReducer
});
