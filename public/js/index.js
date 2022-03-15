import '@babel/polyfill';
import { login, logout } from './login';
import {
  addGlassTocart,
  deleteItemFromCart,
  incsDecQuantity,
  addGlassesWithLenses,
} from './cart';
import { register } from './register';
import {
  updateSettings,
  addBanner,
  removeBanner,
  removeProduct,
  CompletOrder,
  deleteOrder,
  addNewcollection,
  deleteCollection,
  addNewCategory,
  deleteCategory,
  addNewAnnounce,
  deleteAnnounce,
  addNewPage,
  deletePage,
  updateLensesSet,
  addNewProduct,
  addNewVert,
  addNewFav,
  deleteFav,
  setNewPassword,
  sendVerToken,
} from './updateSettings';
import { orderGlasses } from './stripe';

import { filterProd, loadeMoreProd } from './products';

const loginForm = document.querySelector('.form--login');
const registerForm = document.querySelector('.form--register');
const logOutBtn = document.querySelectorAll('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const addTocart = document.querySelector('.add_fram_to_cart');
const addSimpleToCart = document.querySelector('.add_lenses_to_cart');
const removeItemBtn = document.querySelectorAll('.remove_item__cart');
const changeQuantityInput = document.querySelector('.change_quantity');
const checkoutBtn = document.querySelector('.checkout_btn');
const filterContainer = document.querySelector('.filter_container');
const pagenationBtn = document.querySelector('.load_more_btn');
const BannerDataForm = document.querySelector('.banner--form');
const BannerDeleteBtn = document.querySelectorAll('.delete_old_banner');
const productDeleteBtn = document.querySelectorAll('.delete--prode');
const ProdContainer = document.querySelector('.products--list');
const completOrdersbtns = document.querySelectorAll('.edit--order');
const deleteOrdersbtns = document.querySelectorAll('.delete--order');
const collectionDataForm = document.querySelector('#collection--form');
const deleteCollectionBtn = document.querySelectorAll('.delete_old_collection');
const categoryDataForm = document.querySelector('#category--form');
const deletecategoryBtn = document.querySelectorAll('.delete_old_category');
const announceDataForm = document.querySelector('#announce--form');
const announceDeleteBtn = document.querySelectorAll('.announce--delete');
const deletePageBtn = document.querySelectorAll('.delete_old_page');
const pageDataForm = document.querySelector('#page-form');
const lensesDataForm = document.querySelector('#lenes-form');
const productDataForm = document.querySelector('.product--form');
const tryOnDataForm = document.querySelector('#try_on_form');

const addFavBtn = document.querySelectorAll('.add_fav');
const DeleteFavBtn = document.querySelectorAll('.delete_fav');

const passwordDataForm = document.querySelector('.password--form');
const forggotPasswordDataForm = document.querySelector('.forggot_password');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
if (registerForm)
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('LName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const passwordConfirm = document.getElementById('psw-repeat').value;

    register(firstName, lastName, email, password, passwordConfirm);
  });
if (logOutBtn) {
  logOutBtn.forEach((b) => {
    b.addEventListener('click', logout);
  });
}

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = {};
    form.firstName = document.getElementById('fName').value;
    form.lastName = document.getElementById('lName').value;
    form.email = document.getElementById('email').value;
    form.phone = document.getElementById('phone').value;
    form.street = document.getElementById('street').value;
    form.city = document.getElementById('city').value;
    form.postalCode = document.getElementById('postalCode').value;
    form.country = document.getElementById('country').value;
    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('currentPass').value;
    const password = document.getElementById('newPass').value;
    const passwordConfirm = document.getElementById('NewPassConfirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('currentPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('NewPassConfirm').value = '';
  });

if (addSimpleToCart) {
  addSimpleToCart.addEventListener('click', function (e) {
    e.preventDefault();
    addGlassesWithLenses(lensesParameters, lensesCart, e.target.dataset.id);
  });
}

if (removeItemBtn) {
  removeItemBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = btn.dataset;
      deleteItemFromCart(id);
    });
  });
}

if (changeQuantityInput) {
  changeQuantityInput.addEventListener('change', function (e) {
    const { id } = e.target.dataset;
    let quntity = e.target.value;

    setTimeout(() => {
      incsDecQuantity(id, quntity);
    }, 1500);
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    orderGlasses();
  });
}

if (addTocart) {
  addTocart.addEventListener('click', function (e) {
    e.preventDefault();
    const { id } = e.target.dataset;
    addGlassTocart(id);
  });
}

let state = {
  productGender: [],
  colors: [],
  shape: [],
  frameType: [],
  frameMatirial: [],
};

if (filterContainer) {
  filterContainer.addEventListener('click', function (e) {
    const filterbox = e.target.closest('input');
    if (!filterbox) return;

    if (filterbox.checked) state[filterbox.name].push(filterbox.value);

    if (!filterbox.checked) {
      const index = state[filterbox.name].indexOf(filterbox.value);
      state[filterbox.name].splice(index, 1);
    }
    let arrFilter = [];
    for (const [key, value] of Object.entries(state)) {
      if (value.length) arrFilter.push(`${key}=${value}`);
    }
    const query = arrFilter.join('&');

    location.assign(`${location.origin}${location.pathname}?${query}`);
  });
}

let page = 1;

if (pagenationBtn) {
  pagenationBtn.addEventListener('click', function (e) {
    page++;
    let arrFilter = [];
    for (const [key, value] of Object.entries(state)) {
      if (value.length) arrFilter.push(`${key}=${value}`);
    }
    const query = arrFilter.join('&');
    loadeMoreProd(page, query);
  });
}

if (BannerDataForm)
  BannerDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set('link', document.getElementById('banner-url').value);
    form.set('slide', document.getElementById('banner-img').files[0]);
    addBanner(form).then(() => {
      hiddOverlay();
    });
  });

if (BannerDeleteBtn) {
  BannerDeleteBtn.forEach((b) => {
    b.addEventListener('click', async function (e) {
      const { banner } = e.target.dataset;
      removeBanner(banner).then(() => {
        e.target.parentElement.parentElement.remove();
      });
    });
  });
}

if (productDeleteBtn) {
  productDeleteBtn.forEach((p) => {
    p.addEventListener('click', function (e) {
      const { id } = e.target.dataset;
      removeProduct(id);
      ProdContainer.removeChild(e.target.parentElement.parentElement);
    });
  });
}

if (completOrdersbtns) {
  completOrdersbtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      CompletOrder(id);
      const p =
        '<button class="complete" disabled="disabled"> completed!</button>';
      e.target.parentElement.insertAdjacentHTML('afterBegin', p);
      e.target.parentElement.removeChild(e.target);
    });
  });
}

if (deleteOrdersbtns) {
  deleteOrdersbtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      deleteOrder(id);
      e.target.parentElement.parentElement.remove();
    });
  });
}

if (collectionDataForm) {
  collectionDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#collection-name').value);
    form.append('desc', document.querySelector('#collection-desc').value);
    form.append(
      'collectionImage',
      document.querySelector('#collection-thumbnail').files[0]
    );
    addNewcollection(form);
    e.target.reset();
    hiddOverlay();
  });
}

if (deleteCollectionBtn) {
  deleteCollectionBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      deleteCollection(id);
      e.target.parentElement.parentElement.remove();
    });
  });
}

if (categoryDataForm) {
  categoryDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#category-name').value);
    form.append(
      'categoryImage',
      document.querySelector('#category-img').files[0]
    );
    addNewCategory(form);
    hiddOverlay();
  });
}

if (deletecategoryBtn) {
  deletecategoryBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      deleteCategory(id);
      e.target.parentElement.parentElement.remove();
    });
  });
}
if (announceDataForm) {
  announceDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.querySelector('#announce-body').value;
    addNewAnnounce(text);
    e.target.reset();
    hiddOverlay();
  });
}

if (announceDeleteBtn) {
  announceDeleteBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      console.log(id);
      deleteAnnounce(id);
      e.target.parentElement.parentElement.remove();
    });
  });
}
if (pageDataForm) {
  pageDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.querySelector('#page-name').value;
    const myEditor = document.querySelector('#editor');
    const html = myEditor.children[0].innerHTML;
    addNewPage(name, html);
    e.target.reset();
    hiddOverlay();
  });
}

if (deletePageBtn) {
  deletePageBtn.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const { id } = e.target.dataset;
      deletePage(id);
      e.target.parentElement.parentElement.remove();
    });
  });
}

const addTypeToFormHelper = function (formdata, type) {
  type.forEach((t) => {
    formdata.append(t.name, t.value);
  });
};
const addFileToFormHelper = function (formdata, type) {
  type.forEach((t) => {
    formdata.append(t.name, t.files[0]);
  });
};

if (lensesDataForm) {
  lensesDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const { id } = e.target.dataset;
    const form = new FormData();
    form.append('title', document.querySelector('#lenses-title').value);
    const lenseType = document.querySelectorAll('.lenses_type');
    const lenseTypeDesc = document.querySelectorAll('.description_type_lense');
    const thicknessTitles = document.querySelectorAll('.thikness_title');
    const thiknessDescriptions = document.querySelectorAll(
      '.thikness_description'
    );
    const thiknessRefractions = document.querySelectorAll(
      '.thikness_refraction'
    );
    const thicknessPrices = document.querySelectorAll('.thickness_price');
    const adTypeTitle = document.querySelectorAll('.ad_type_title');
    const adTypeDescription = document.querySelectorAll('.ad_type_description');
    const adTypePrice = document.querySelectorAll('.ad_type_price');
    const thiknessPreview = document.querySelectorAll('.thikness_preview');
    addTypeToFormHelper(form, lenseType);
    addTypeToFormHelper(form, lenseTypeDesc);
    addTypeToFormHelper(form, thicknessTitles);
    addTypeToFormHelper(form, thiknessDescriptions);
    addTypeToFormHelper(form, thiknessRefractions);
    addTypeToFormHelper(form, thicknessPrices);
    addTypeToFormHelper(form, adTypeTitle);
    addTypeToFormHelper(form, adTypeDescription);
    addTypeToFormHelper(form, adTypePrice);
    addFileToFormHelper(form, thiknessPreview);

    updateLensesSet(form, id);
  });
}

const prodeToFormHelper = function (formdata, t) {
  if (!t.value) return;
  formdata.append(t.name, t.value);
};

if (productDataForm) {
  productDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    const prod_title = document.querySelector('#prod_title');
    const prod_glassWidth = document.querySelector('#prod_glassWidth');
    const prod_price = document.querySelector('#prod_price');
    const prod_sideSize = document.querySelector('#prod_sideSize');
    const prod_lenseSize = document.querySelector('#prod_lenseSize');
    const prod_lenseHeight = document.querySelector('#prod_lenseHeight');
    const prod_shape = document.querySelector('#prod_shape');
    const prod_colors = document.querySelector('#prod_colors');
    const prod_templeColor = document.querySelector('#prod_templeColor');
    const prod_productGender = document.querySelector('#prod_productGender');
    const prod_frameMaterial = document.querySelector('#prod_frameMaterial');
    const prod_frameType = document.querySelector('#prod_frameType');
    const prod_noasSize = document.querySelector('#prod_noasSize');

    const glassesType = document.querySelector('#glasses--Type');
    const glassesCollections = document.querySelector('#glasses--collections');
    const glassesCategories = document.querySelector('#glasses--categories');
    const glassesLenses = document.querySelector('#glasses--lenses');
    const prodImgPreview = document.querySelectorAll('.prod_img_preview');
    const prodDescription = document.querySelector('#prod_description');

    prodeToFormHelper(form, prod_title);
    prodeToFormHelper(form, prod_glassWidth);
    prodeToFormHelper(form, prod_price);
    prodeToFormHelper(form, prod_sideSize);
    prodeToFormHelper(form, prod_lenseSize);
    prodeToFormHelper(form, prod_noasSize);
    prodeToFormHelper(form, prod_lenseHeight);
    prodeToFormHelper(form, prod_frameType);
    prodeToFormHelper(form, prod_shape);
    prodeToFormHelper(form, prod_colors);
    prodeToFormHelper(form, prod_templeColor);
    prodeToFormHelper(form, prod_productGender);
    prodeToFormHelper(form, prod_frameMaterial);
    prodeToFormHelper(form, glassesType);
    prodeToFormHelper(form, glassesCollections);
    prodeToFormHelper(form, glassesCategories);
    prodeToFormHelper(form, glassesLenses);
    prodeToFormHelper(form, prodDescription);
    addFileToFormHelper(form, prodImgPreview);

    addNewProduct(form);
    e.target.reset();
  });
}

if (tryOnDataForm) {
  tryOnDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('productId', document.querySelector('#selected_prod').value);

    const arr = new Array(...document.querySelector('#vurtial_inputs').files);

    arr.map((_, i) => {
      form.append(
        'virtualsObject',
        document.querySelector('#vurtial_inputs').files[i]
      );
    });
    addNewVert(form);
    e.target.reset();
    hiddOverlay();
  });
}

if (addFavBtn) {
  addFavBtn.forEach((add) => {
    add.addEventListener('click', function (e) {
      e.preventDefault();
      const anchor = e.target.parentElement;
      const { product, user } = anchor.dataset;
      addNewFav(product, user);
    });
  });
}
if (DeleteFavBtn) {
  DeleteFavBtn.forEach((del) => {
    del.addEventListener('click', function (e) {
      e.preventDefault();
      const anchor = e.target.parentElement;
      const { fav } = anchor.dataset;
      deleteFav(fav);
    });
  });
}

if (passwordDataForm) {
  passwordDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData();
    form.append('password', document.querySelector('#password').value);
    form.append(
      'passwordConfirm',
      document.querySelector('#passwordConfirm').value
    );
    const urlLink = location.href.split('/');
    const token = urlLink[urlLink.length - 1];
    setNewPassword(form, token);
  });
}

if (forggotPasswordDataForm) {
  forggotPasswordDataForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.querySelector('#email_forggot').value;
    sendVerToken(email);
  });
}
