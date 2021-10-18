import axios from 'axios';
import { showAlert } from './alerts';

// filter
const productsContainer = document.querySelector('.prods');

export const filterProd = async (filterObj = '') => {
  try {
    spinnerLoader();
    const res = await axios(`/api/products?limit=3&${filterObj}`);

    if (res.data.status === 'success') {
      if (!productsContainer) return;

      const { data } = res.data.data;
      productsContainer.textContent = '';

      if (!data.length) return spinnerhidd();

      data.map((p) => {
        const html = `
        <div class="product_cart">
              <img
                src="/img/products/${p.images[0]}"
                alt="${p.title}"
                class="product_preview"
              />
              <span class="product_title">${p.title}</span>
              <a href="/product/${p.id}" class="product_actions">
                <span class="price">${p.price}$</span>
                <span class="try_on">
                  <span class="material-icons"> videocam </span>
                </span>
              </a>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', html);
        spinnerhidd();
      });
    }
  } catch (err) {
    console.log(err);
    spinnerhidd();
  }
};

// pagination/loading

export const loadeMoreProd = async (pagenatObj, filter) => {
  try {
    spinnerLoader();

    const res = await axios(
      `/api/products?${filter}&limit=3&page=${pagenatObj}`
    );

    if (res.data.status === 'success') {
      if (!productsContainer) return;

      const { data } = res.data.data;

      if (!data.length) {
        spinnerhidd();
        showAlert('error', 'no more resulte');
        return;
      }

      data.map((p) => {
        const html = `
        <div class="product_cart">
              <img
                src="/img/products/${p.images[0]}"
                alt="${p.title}"
                class="product_preview"
              />
              <span class="product_title">${p.title}</span>
              <a href="/product/${p.id}" class="product_actions">
                <span class="price">${p.price}$</span>
                <span class="try_on">
                  <span class="material-icons"> videocam </span>
                </span>
              </a>
            </div>
        `;
        productsContainer.insertAdjacentHTML('beforeend', html);
        spinnerhidd();
      });
    }
  } catch (err) {
    console.log(err);
    spinnerhidd();
  }
};
