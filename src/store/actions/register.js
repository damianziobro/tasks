import axios from '../../axiosBaseInstance';

export const REGISTER = 'REGISTER';
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = (username, email) => ({
  type: REGISTER_SUCCESS,
  username,
  email,
});

export const registerFail = error => ({
  type: REGISTER_FAIL,
  error,
});

export const register = (username, email, password) => (dispatch) => {
  dispatch(registerStart());

  const url = 'register';
  const registerData = {
    username,
    email,
    password,
  };

  axios.post(url, registerData)
    .then(({ data: { data: { username, email } } }) => {
      dispatch(registerSuccess(username, email));
    })
    .catch((error) => {
      dispatch(registerFail(error.response.data));
    });
};
