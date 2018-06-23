import {
  updateObject,
} from '../../shared/utility';

import {
  SIGN_IN_START,
  LOGOUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from '../actions/signIn';

const initialState = {
  token: null,
  username: null,
  email: null,
  isError: false,
  isLoading: false,
  isAuthenticated: false,
};

const signInStart = state => updateObject(state, {
  isError: false,
  isLoading: true,
});

const signInSuccess = (state, { username, email, token }) => updateObject(state, {
  username,
  email,
  token,
  isError: false,
  isLoading: false,
  isAuthenticated: true,
});

const signInFail = state => updateObject(state, {
  isError: true,
  isLoading: false,
});

const logout = state => updateObject(state, {
  token: null,
  username: null,
  email: null,
  isAuthenticated: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_START: return signInStart(state, action);
    case SIGN_IN_SUCCESS: return signInSuccess(state, action);
    case SIGN_IN_FAIL: return signInFail(state, action);
    case LOGOUT: return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
