import axios from '../../axiosBaseInstance';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';
export const LOGOUT = 'LOGOUT';

export const signInStart = () => ({
  type: SIGN_IN_START,
});

export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

  return {
    type: LOGOUT,
  };
};

export const signInSuccess = (username, email, token) => ({
  type: SIGN_IN_SUCCESS,
  username,
  email,
  token,
});

export const signInFail = () => ({
  type: SIGN_IN_FAIL,
});

export const setAutoLogOut = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

export const tryAutoSignIn = () => (dispatch) => {
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
      const expirationTime = (localStorage.getItem('expirationDate') * 1000) - new Date().getTime();

      dispatch(signInSuccess(username, email, token));
      dispatch(setAutoLogOut(expirationTime));
    }
  }
};

export const signIn = (values, setErrors, setSubmitting) => (dispatch) => {
  dispatch(signInStart());

  const url = 'signin';

  axios.post(url, values)
    .then(({ data: { data: { username, email }, meta: { token, expiry_at: expirationDate } } }) => {
      const expirationTime = (expirationDate * 1000) - new Date().getTime();

      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(signInSuccess(username, email, token));
      dispatch(setAutoLogOut(expirationTime));
    })
    .catch(({ response: { data: { message } } }) => {
      dispatch(signInFail());
      setSubmitting(false);
      setErrors({ password: message });
    });
};
