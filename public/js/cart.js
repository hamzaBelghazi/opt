import axios from 'axios';
import { showAlert } from './alerts';

const cartContainer = document.querySelector('.cart');
const wrapperContainer = document.querySelector('.wrapper');

export const deleteItemFromCart = async (itemId) => {
  spinnerLoader();
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/cart/${itemId}`,
    });
    if ((res.data.status = 'success')) location.reload(true);
    spinnerhidd();
  } catch (err) {
    showAlert('error', 'Deleting Error! Try again.');
    spinnerhidd();
  }
};

export const incsDecQuantity = async (itemId, quntity) => {
  spinnerLoader();
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/cart/changeQuantity/${itemId}/${quntity}`,
    });
    if ((res.data.status = 'success')) location.reload(true);
    spinnerhidd();
  } catch (err) {
    showAlert('error', 'Deleting Error! Try again.');
    spinnerhidd();
  }
};

export const addGlassesWithLenses = async (lensesOpt, itemId) => {
  spinnerLoader();
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/cart/item/addglassesWithlenses/${itemId}`,
      data: {
        lensesOpt,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'glasses was added to your cart');
      location.reload(true);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const addGlassTocart = async (itemId) => {
  spinnerLoader();

  try {
    const res = await axios({
      method: 'GET',
      url: `/api/cart/add-to-cart/${itemId}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'glasses was added to your cart');
      location.reload();
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', 'please try again!');
    spinnerhidd();
  }
};
