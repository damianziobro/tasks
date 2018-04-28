import { updateObject } from '../../shared/utility';
import { AUTH_START, REGISTER_SUCCESS, AUTH_FAIL, LOGOUT, SIGN_IN_SUCCESS } from '../actions/auth';

const initialState = {
    token: null,
    username: null,
    email: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const registerSuccess = (state, action) => {
    return updateObject(state, { 
        username: action.username,
        email: action.email,
        error: null,
        loading: false
     });
};

const signInSuccess = (state, action) => {
    return updateObject(state, { 
        username: action.username,
        email: action.email,
        token: action.token,
        error: null,
        loading: false
     });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        email: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case REGISTER_SUCCESS: return registerSuccess(state, action);
        case SIGN_IN_SUCCESS: return signInSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case LOGOUT: return logout(state, action);
        default:
            return state;
    }
};

export default reducer;