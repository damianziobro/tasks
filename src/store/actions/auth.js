import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const REGISTER = 'REGISTER';
export const SIGN_IN = 'SIGN_IN';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return {
        type: LOGOUT
    };
};

export const registerSuccess = (username, email) => {
    return {
        type: REGISTER_SUCCESS,
        username: username,
        email: email
    };
};

export const signInSuccess = (username, email, token) => {
    return {
        type: SIGN_IN_SUCCESS,
        username: username,
        email: email,
        token: token
    };
};

export const register = (username, email, password) => {
    return dispatch => {
        dispatch(authStart());

        let url = 'http://138.68.84.92/api/register';
        const registerData = {
            username: username,
            email: email,
            password: password
        };

            axios.post(url, registerData)
            .then(response => {
                localStorage.setItem('token', response.data.meta.token);
                localStorage.setItem('username', response.data.data.username);
                dispatch(registerSuccess(response.data.meta.token, response.data.data.username));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        let url = 'http://138.68.84.92/api/signin';
        const signInData = {
            email: email,
            password: password
        };

        axios.post(url, signInData)
            .then(response => {
                localStorage.setItem('token', response.data.meta.token);
                localStorage.setItem('username', response.data.data.username);
                dispatch(signInSuccess(response.data.data.username, response.data.data.email, response.data.meta.token));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};