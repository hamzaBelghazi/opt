/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';
const bannerContainer = document.querySelector('.banner_container');
const collectionsContainer = document.querySelector('.old--collections');
const categorysContainer = document.querySelector('.old--categories');
const announcesContainer = document.querySelector('.old_announces');
const pagesContainer = document.querySelector('.old--pages');
const selectedProd = document.querySelector('.selected_prod');

export const updateSettings = async (data, type) => {
  try {
    spinnerLoader();

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
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

// admin

export const addBanner = async (data) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: 'api/banners/addbanner',
      data,
    });
    console.log(res);
    if (res.data.status === 'success') {
      showAlert('success', `banner added successfully!`);
      const bannerHtml = `
           <tr>
                    <td class="column1">
                      <img
                        class="banner_preview"
                        src="/img/banners/${res.data.data.data.slide}"
                        alt=""
                      />
                    </td>
                    <td class="column5">${res.data.data.data.link}</td>
                    <td class="column7">
                      <span
                        class="material-icons delete delete_old_banner"
                        data-banner="${res.data.data.data._id}"
                      >
                        delete
                      </span>
                    </td>
                  </tr>
      
      `;
      bannerContainer.insertAdjacentHTML('beforeend', bannerHtml);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};
export const removeBanner = async (bnrId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `api/banners/delete-banner/${bnrId}`,
    });

    if (res.status === 204) {
      showAlert('success', `banner Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

// products

export const removeProduct = async (prId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `api/products/${prId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Product Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

//Orders

export const CompletOrder = async (oId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'PATCH',
      url: `api/orders/${oId}`,
      data: {
        isComplet: true,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', `complet successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
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
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

// colections
export const addNewcollection = async (data) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: '/api/collections/addcollection',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Collection added successfully!`);
      const html = `
      <tr>
      <td class="column3">${res.data.data.data.name}</td>
      <td class="column4">
        <img
          src="/img/collection/${res.data.data.data.collectionImage}"
          class="collection_img"
        />
      </td>
      <td class="column7">
        <span
          data-id="${res.data.data.data.id} "
          =""
          class="material-icons delete delete_old_collection"
        >
          delete
        </span>
      </td>
    </tr>
      `;
      collectionsContainer.insertAdjacentHTML('beforeend', html);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const deleteCollection = async (CId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `api/collections/${CId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Collection Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

// category
export const addNewCategory = async (data) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: '/api/categories/addcategory',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `category added successfully!`);
      const html = `
      <tr>
      <td class="column3">${res.data.data.data.name}</td>
      <td class="column4">
        <img
          src="/img/category/${res.data.data.data.categoryImage}"
          class="category_img"
        />
      </td>
      <td class="column7">
        <span
          data-id="${res.data.data.data.id} "
          =""
          class="material-icons delete delete_old_category"
        >
          delete
        </span>
      </td>
    </tr>
      `;
      categorysContainer.insertAdjacentHTML('beforeend', html);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const deleteCategory = async (CId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `api/categories/${CId}`,
    });

    if (res.status === 204) {
      showAlert('success', `category Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

// announce
export const addNewAnnounce = async (data) => {
  try {
    spinnerLoader();

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
      <tr>
      <td class="column3">${res.data.data.data.announceText}</td>
      <td class="column7">
        <span class="material-icons delete" ${res.data.data.data.id}> delete </span>
      </td>
    </tr>
      `;
      announcesContainer.insertAdjacentHTML('beforeend', html);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const deleteAnnounce = async (aId) => {
  try {
    spinnerLoader();
    const res = await axios({
      method: 'DELETE',
      url: `api/announces/${aId}`,
    });

    if (res.status === 204) {
      showAlert('success', `Announce Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

//pages

export const deletePage = async (pId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `api/pages/${pId}`,
    });

    if (res.status === 204) {
      showAlert('success', `page Deleted successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const addNewPage = async (name, pageBody) => {
  try {
    spinnerLoader();

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
      <tr>
      <td class="column3">${res.data.data.data.name}</td>
      <td class="column7">
        <span class="material-icons delete page--delete" data-id="${res.data.data.data.id}">
          delete
        </span>
      </td>
    </tr>

      `;
      pagesContainer.insertAdjacentHTML('beforeend', html);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const updateLensesSet = async (data, id) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'PATCH',
      url: `/api/lenses/${id}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `lenses updated successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const addNewProduct = async (data) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: '/api/products/',
      data,
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `Product added successfully please add Try on 3D object!`
      );
      selectedProd.value = res.data.data.data.id;
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const addNewVert = async (data) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: 'api/virtuals/addvirtualTry',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `try on added successfully!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

//   favourite

export const addNewFav = async (product, user) => {
  try {
    spinnerLoader();

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
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const deleteFav = async (fId) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'DELETE',
      url: `/api/favourite/deleteFa/${fId}`,
    });

    if (res.status === 204) {
      showAlert('success', `product removed from favourite!`);
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinnerhidd();
  }
};

export const setNewPassword = async (data, token) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'PATCH',
      url: `/api/users/resetPassword/${token}`,
      data,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', `password is set!`);
      location.assign('/');
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message} try again!`);
    spinnerhidd();
  }
};

export const sendVerToken = async (email) => {
  try {
    spinnerLoader();

    const res = await axios({
      method: 'POST',
      url: `/api/users/forgotPassword`,
      data: { email },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', `verefication  sent  to your email!`);
      spinnerhidd();
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}!`);
    spinnerhidd();
  }
};
