import axios from '../../axiosBaseInstance';

export const AUTH_START = 'AUTH_START';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const REGISTER = 'REGISTER';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const SIGN_IN = 'SIGN_IN';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');

    return {
        type: LOGOUT
    };
};

export const registerSuccess = (username, email) => {
    return {
        type: REGISTER_SUCCESS,
        username,
        email
    };
};

export const registerFail = (err) => {
    return {
        type: REGISTER_FAIL,
        err
    };
};

export const signInSuccess = (username, email, token) => {
    return {
        type: SIGN_IN_SUCCESS,
        username,
        email,
        token
    };
};

export const signInFail = (err) => {
    return {
        type: SIGN_IN_FAIL,
        err
    };
};

export const setAutoLogOut = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const tryAutoSignIn = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const username = localStorage.getItem('username');
                const email = localStorage.getItem('email');
                const expirationTime = localStorage.getItem('expirationDate') * 1000 - new Date().getTime();

                dispatch(signInSuccess(username, email, token));
                dispatch(setAutoLogOut(expirationTime));
            };
        };
    };
};

export const register = (username, email, password) => {
    return (dispatch) => {
        dispatch(authStart());

        let url = 'register';
        const registerData = {
            username,
            email,
            password
        };

            axios.post(url, registerData)
            .then(response => {
                dispatch(registerSuccess(response.data.data.username, response.data.data.email));
            })
            .catch(err => {
                dispatch(registerFail(err.response.data));
            });
    };
};

export const signIn = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());

        let url = 'signin';
        const signInData = {
            email,
            password
        };

        axios.post(url, signInData)
            .then(response => {
                const expirationTime = response.data.meta.expiry_at * 1000 - new Date().getTime();

                localStorage.setItem('username', response.data.data.username);
                localStorage.setItem('email', response.data.data.email);
                localStorage.setItem('token', response.data.meta.token);
                localStorage.setItem('expirationDate', response.data.meta.expiry_at);

                dispatch(signInSuccess(response.data.data.username, response.data.data.email, response.data.meta.token));
                dispatch(setAutoLogOut(expirationTime));
            })
            .catch(err => {
                dispatch(signInFail(err.response.data.message));
            });
    };
};