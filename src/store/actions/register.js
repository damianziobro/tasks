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

export const registerFail = () => ({
  type: REGISTER_FAIL,
});

export const register = (values, setErrors, setSubmitting) => (dispatch) => {
  dispatch(registerStart());

  const url = 'register';

  axios.post(url, values)
    .then(({ data: { data: { username, email } } }) => {
      dispatch(registerSuccess(username, email));
    })
    .catch(({ response: { data: { errors } } }) => {
      dispatch(registerFail());
      setSubmitting(false);
      setErrors(errors);
    });
};
