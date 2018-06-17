import {
  updateObject,
} from '../../shared/utility';

import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/register';

const initialState = {
  username: null,
  email: null,
  error: null,
  isLoading: false,
  isRegistered: false,
};

const registerStart = state => updateObject(state, {
  error: null,
  isLoading: true,
});

const registerSuccess = (state, { username, email }) => updateObject(state, {
  username,
  email,
  error: null,
  isLoading: false,
  isRegistered: true,
});

const registerFail = (state, { error }) => updateObject(state, {
  error,
  isLoading: false,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START: return registerStart(state, action);
    case REGISTER_SUCCESS: return registerSuccess(state, action);
    case REGISTER_FAIL: return registerFail(state, action);
    default:
      return state;
  }
};

export default reducer;

