/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';

const bannerContainer = document.querySelector('.old_banners');
const collectionsContainer = document.querySelector('.old--collections');
const categorysContainer = document.querySelector('.old--categories');
const announcesContainer = document.querySelector('.old_announces');
const pagesContainer = document.querySelector('.old--pages');
const selectedProd = document.querySelector('.selected_prod');

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/users/updateMyPassword'
        : 'api/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// admin

export const addBanner = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/banners/addbanner',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `banner added successfully!`);
      const bannerHtml = `
      <div class="old-banner">
        <img class="old_banner_img" src="/img/banners/${res.data.data.data.slide}" alt='${res.data.data.data.link}'>
        <span class="delete_old_banner" data-banner='${res.data.data.data._id}'>x</span>
      </div>
      
      `;
      bannerContainer.insertAdjacentHTML('beforeend', bannerHtml);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const removeBanner = async (bnrId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/banners/delete-banner/${bnrId}`,
    });

    if (res.status === 204) {
      showAlert('success', `banner Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// products

export const removeProduct = async (prId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/products/${prId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Product Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

//Orders

export const CompletOrder = async (oId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `api/orders/${oId}`,
      data: {
        isComplet: true,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `complet successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteOrder = async (oId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/orders/${oId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Order Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// colections
export const addNewcollection = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/collections/addcollection',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Collection added successfully!`);
      const html = `
      <div class="old-banner">
        <img class="old_banner_img" src="/img/collection/${res.data.data.data.collectionImage}" alt='${res.data.data.data.name}'>
        <span class="delete_old_collection" data-id='${res.data.data.data._id}'>x</span>
      </div>
      `;
      collectionsContainer.insertAdjacentHTML('beforeend', html);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteCollection = async (CId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/collections/${CId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Collection Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// category
export const addNewCategory = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/categories/addcategory',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `category added successfully!`);
      const html = `
      <div class="old-banner">
        <img class="old_banner_img" src="/img/category/${res.data.data.data.categoryImage}" alt='${res.data.data.data.name}'>
        <span class="delete_old_category" data-id='${res.data.data.data._id}'>x</span>
      </div>
      `;
      categorysContainer.insertAdjacentHTML('beforeend', html);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteCategory = async (CId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/categories/${CId}`,
    });

    if (res.status === 204) {
      showAlert('success', `category Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// announce
export const addNewAnnounce = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/announces/addannounce',
      data: {
        announceText: data,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `Annoucement added successfully!`);
      console.log(res.data.data);
      const html = `
      <div class='announce'>
        <span class="announce--body">
          ${res.data.data.data.announceText}
        </span>
        <span class="announce--delete" data-id='${res.data.data.data.id}''>x</span>
      </div>

      `;
      announcesContainer.insertAdjacentHTML('beforeend', html);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteAnnounce = async (aId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/announces/${aId}`,
    });

    if (res.status === 204) {
      showAlert('success', `category Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

//pages

export const deletePage = async (pId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `api/pages/${pId}`,
    });

    if (res.status === 204) {
      showAlert('success', `page Deleted successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addNewPage = async (name, pageBody) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/pages/addpage',
      data: {
        name,
        pageBody,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `page added successfully!`);
      const html = `
      <div class='page'>
        <span class="old_page_name">
          ${res.data.data.data.name}
        </span>
        <span class="delete_old_page" data-id='${res.data.data.data.id}''>x</span>
      </div>

      `;
      pagesContainer.insertAdjacentHTML('beforeend', html);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateLensesSet = async (data, id) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/lenses/${id}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `lenses updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addNewProduct = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/products/',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Product added successfully!`);
      selectedProd.value = res.data.data.data.id;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const addNewVert = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'api/virtuals/addvirtualTry',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `try on added successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

//   favourite

export const addNewFav = async (product, user) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/favourite',
      data: {
        product,
        user,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `product  added to favourite!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteFav = async (fId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/favourite/deleteFa/${fId}`,
    });

    if (res.status === 204) {
      showAlert('success', `product removed from favourite!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const setNewPassword = async (data, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/users/resetPassword/${token}`,
      data,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', `password is set!`);
      location.assign('/');
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message} try again!`);
  }
};

export const sendVerToken = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/users/forgotPassword`,
      data: { email },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', `verefication  sent  to your email!`);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}!`);
  }
};
