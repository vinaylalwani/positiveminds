// rootReducer.ts
import {combineReducers} from 'redux';
import signInReducer from 'App/Containers/SigninScreen/SigninScreenReducer';
import profileReducer from 'App/Containers/ProfileScreen/ProfileScreenReducer';
import commonReducer from './commonReducer';

export const rootReducer = combineReducers({
  signIn: signInReducer,
  common: commonReducer,
  profile: profileReducer,
});

export default rootReducer;
