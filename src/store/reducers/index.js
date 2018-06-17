import { combineReducers } from 'redux';

import signIn from './signIn';
import register from './register';
import todos from './todos';

export default combineReducers({
  register,
  signIn,
  todos,
});
