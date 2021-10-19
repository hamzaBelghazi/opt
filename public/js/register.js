/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const register = async (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) => {
  spinnerLoader();

  try {
    const res = await axios({
      method: 'POST',
      url: '/api/users/signup',
      data: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your Account created successfully!');
      window.setTimeout(() => {
        spinnerhidd();

        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
    spinnerhidd();
  }
};
