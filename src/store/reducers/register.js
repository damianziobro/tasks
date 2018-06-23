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
  isError: false,
  isLoading: false,
  isRegistered: false,
};

const registerStart = state => updateObject(state, {
  isError: false,
  isLoading: true,
});

const registerSuccess = (state, { username, email }) => updateObject(state, {
  username,
  email,
  isError: false,
  isLoading: false,
  isRegistered: true,
});

const registerFail = state => updateObject(state, {
  isError: true,
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

