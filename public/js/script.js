function id(v) {
  return document.getElementById(v);
}
function loadbar() {
  var ovrl = id('overlay'),
    prog = id('progress'),
    stat = id('progstat'),
    img = document.images,
    c = 0,
    tot = img.length;
  if (tot == 0) return doneLoading();

  function imgLoaded() {
    c += 1;
    var perc = (((100 / tot) * c) << 0) + '%';
    if (prog) {
      prog.style.width = perc;
      stat.innerHTML = 'Loading ' + perc;
      if (c === tot) return doneLoading();
    }
  }
  function doneLoading() {
    if (ovrl) {
      ovrl.style.opacity = 0;
      setTimeout(function () {
        ovrl.style.display = 'none';
      }, 1200);
    }
  }
  for (var i = 0; i < tot; i++) {
    var tImg = new Image();
    tImg.onload = imgLoaded;
    tImg.onerror = imgLoaded;
    tImg.src = img[i].src;
  }
}
document.addEventListener('DOMContentLoaded', loadbar, false);

if (document.querySelector('.splide')) {
  const splide = new Splide('.splide', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    width: '100%',
    perPage: 1,
    autoScroll: {
      speed: 1,
    },
  });

  splide.mount(window.splide.Extensions);
}
if (document.querySelector('#product-slider')) {
  var productslider = new Splide('#product-slider', {
    pagination: false,
  });

  var thumbnails = document.getElementsByClassName('thumbnail');
  var current;

  for (var i = 0; i < thumbnails.length; i++) {
    initThumbnail(thumbnails[i], i);
  }

  function initThumbnail(thumbnail, index) {
    thumbnail.addEventListener('click', function () {
      productslider.go(index);
    });
  }

  productslider.on('mounted move', function () {
    var thumbnail = thumbnails[productslider.index];

    if (thumbnail) {
      if (current) {
        current.classList.remove('is-active');
      }

      thumbnail.classList.add('is-active');
      current = thumbnail;
    }
  });

  productslider.mount();
}

const date = new Date();
const year = date.getFullYear();
const copyrightYear = document.querySelector('.year');
if (copyrightYear) copyrightYear.textContent = year;

const tabContainer = document.querySelector('.operations__tab-container');
const tabbuttons = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

// search scripr
const searchToggle = function () {
  const searchbox = document.querySelector('.search__container');
  const searchOpen = document.querySelector('.toggle__search');

  function toggleSearch() {
    searchbox.classList.toggle('show');
    searchbox.querySelector('input').focus();
  }
  if (!searchOpen) return;

  searchOpen.addEventListener('click', (e) => {
    toggleSearch();
  });
};

// cart script

const toggleElement = function (wrapper, showBtn, hiddBtn, hiddOverlay) {
  function hideElement() {
    wrapper.classList.remove('active');
    document.body.classList.remove('noscroll');
  }
  function showElement() {
    wrapper.classList.add('active');
    document.body.classList.add('noscroll');
  }
  showBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showElement();
  });
  hiddBtn.addEventListener('click', hideElement);
  hiddOverlay.addEventListener('click', hideElement);
};

const openCart = function () {
  const wrapper = document.querySelector('.cart__toggle');
  const cartOpenBtn = document.querySelector('.cart_link');
  const cartCloseBtn = document.querySelector('.cart__close');
  const cartCloseOverlay = document.querySelector('.cart__overlay');
  if (wrapper) {
    toggleElement(wrapper, cartOpenBtn, cartCloseBtn, cartCloseOverlay);
  }
};

// menu script

const menuToggel = function () {
  const wrapper = document.querySelector('.menu__toggle');
  const menuOpenBtn = document.querySelector('.menu_link');
  const menuCloseBtn = document.querySelector('.menu__close');
  const menuCloseOverlay = document.querySelector('.menu__overlay');
  if (wrapper) {
    toggleElement(wrapper, menuOpenBtn, menuCloseBtn, menuCloseOverlay);
  }
};

// filter choices
const filterContainers = document.querySelectorAll('.filter');

filterContainers.forEach((f) => {
  f.addEventListener('click', function (e) {
    const title = e.target.closest('.filter_title');
    if (!title) return;
    const choices = title.parentElement.querySelector('.choices');
    choices.classList.toggle('toggled');
  });
});

const filterBtn = document.querySelector('.filter__button');
const filterContainer = document.querySelector('.filter__toggle');

const openFilter = function () {
  if (!filterBtn || !filterContainer) return;
  filterBtn.addEventListener('click', function (e) {
    filterContainer.classList.toggle('show_filter');
  });
};
const hiddfilter = function () {
  filterContainer.classList.remove('show_filter');
};
const showFilter = function () {
  filterContainer.classList.add('show_filter');
};
if (filterContainer) {
  window.addEventListener('resize', function (e) {
    if (e.target.innerWidth < 840) {
      hiddfilter();
    } else {
      showFilter();
    }
  });
}

openFilter();
menuToggel();
searchToggle();
openCart();

if (tabContainer)
  tabContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;
    tabbuttons.forEach((t) => t.classList.remove('operations__tab--active'));
    tabContent.forEach((t) =>
      t.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });

const primaryAxis = document.querySelector('#primaryAxis');
const seondaryAxis = document.querySelector('#seondaryAxis');
i = 0;

if (primaryAxis && seondaryAxis)
  while (i < 181) {
    primaryAxis.insertAdjacentHTML(
      'beforeend',
      `<option value="${i}">${i}</option>`
    );
    seondaryAxis.insertAdjacentHTML(
      'beforeend',
      `<option value="${i}">${i}</option>`
    );
    i++;
  }
const lensesTypeContainer = document.querySelector('.lenses-type');
const thicknessType = document.querySelector('.Thickness-type');
const advancedLensesType = document.querySelector('.ad-lenses-type');
const paramsContainer = document.querySelector('.parametre-ayes');

let lensesCart = {};
let lensesParameters = {};
if (paramsContainer) {
  paramsContainer.addEventListener('click', function (e) {
    e.stopPropagation();
    const select = e.target.closest('select');
    if (!select) return;

    select.addEventListener('change', function (e) {
      spinnerLoader();
      e.preventDefault();
      setTimeout(() => {
        const { preview } = e.target.dataset;
        const elementPrev = document.querySelector(`.${preview}`);
        if (elementPrev.classList[0].includes('spd')) {
          elementPrev.textContent = e.target.value + 'mm';
        } else {
          elementPrev.textContent = e.target.value;
        }
        lensesParameters[preview] = e.target.value;
        lensesCart[preview] = e.target.value;
        spinnerhidd();
      }, 600);
    });
  });
}
const spinnerLoader = function () {
  document.querySelector('.spinnerLoad').style.visibility = 'inherit';
};
const spinnerhidd = function () {
  document.querySelector('.spinnerLoad').style.visibility = 'hidden';
};

function havTwoPd() {
  const checkBox = document.getElementById('have-pd');
  const onePdinput = document.querySelector('#onePD');
  const rPD = document.querySelector('#primaryPD');
  const lPD = document.querySelector('#seondaryPD');
  const totalSpd = document.querySelector('.total-spd');
  const showRpd = document.querySelector('.right-spd');
  const showLpd = document.querySelector('.left-spd');
  if (checkBox.checked == true) {
    onePdinput.classList.add('hidden');
    rPD.classList.remove('hidden');
    lPD.classList.remove('hidden');
    totalSpd.textContent = '';
  } else {
    rPD.classList.add('hidden');
    lPD.classList.add('hidden');
    onePdinput.classList.remove('hidden');
    showRpd.textContent = '';
    showLpd.textContent = '';
  }
}

const customThikPrice = document.querySelector('.custom-thik-price');
const customAltPrice = document.querySelector('.custom-alt-price');
const customTotalPrice = document.querySelector('.custom-total-price');
let thikPrice = 0;
let altPrice = 0;
let totalPrice = Number(customTotalPrice?.textContent);

const lensesTypesSetToCart = function (container, paramsType) {
  if (container) {
    container.addEventListener('click', function (e) {
      e.preventDefault();
      const targetIlement = e.target.closest('label').querySelector('input');
      spinnerLoader();
      if (!targetIlement) return;
      if (targetIlement.checked === false) {
        if (targetIlement.id === 'progressive') {
          document.querySelector('.Addition').classList.remove('hidden');
          document.querySelector('.add-p').classList.remove('hidden');
        } else {
          document.querySelector('.Addition').classList.add('hidden');
          document.querySelector('.add-p').classList.add('hidden');
        }
        lensesCart[paramsType] = {
          type: targetIlement.value,
        };
        if (paramsType === 'thicknessType') {
          customThikPrice.textContent = targetIlement.dataset.f;

          thikPrice = Number(targetIlement.dataset.f);
          customTotalPrice.textContent = totalPrice + thikPrice + altPrice;
        }
        if (paramsType === 'advancedLensesType') {
          customAltPrice.textContent = targetIlement.dataset.f;
          altPrice = Number(targetIlement.dataset.f);
          customTotalPrice.textContent = totalPrice + thikPrice + altPrice;
        }

        targetIlement.checked = true;
      }
      setTimeout(spinnerhidd, 600);
    });
  }
};

lensesTypesSetToCart(lensesTypeContainer, 'lensesType');
lensesTypesSetToCart(thicknessType, 'thicknessType');
lensesTypesSetToCart(advancedLensesType, 'advancedLensesType');

const tryon = document.querySelector('.try-on');
const containerPdMeasure = document.querySelector('.overlay_pd_container');
const closePdBtn = document.querySelector('.close_pd_overlay');
const closePdOverlay = document.querySelector('.overlay_pd');
const drag1 = document.querySelector('#drag-1');
const drag2 = document.querySelector('#drag-2');
const ccSelect = document.querySelector('#select-cc');
const dist = document.querySelector('.dist');
const YPdIs = document.querySelector('.your-pd');
const rslt = document.querySelector('.rslt');
const leftControllContainer = document.querySelector('.left__controll');
const rightControllContainer = document.querySelector('.right__controll');

if (tryon)
  tryon.addEventListener('click', () => {
    containerPdMeasure.classList.add('active_measure');
    document.body.classList.add('noscroll');

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    // We will scale the photo width to this
    width = 360;
    var height = 0; // This will be computed based on the input stream
    var pdNext = document.querySelector('.pd-next');
    var pdFinal = document.querySelector('.pd-final');
    var streaming = false;
    var textGuid = document.querySelector('.guid-text');
    var video = null;
    var canvas = null;
    var photo = null;
    var capture = null;
    var startbutton = null;
    var wcard = null;
    var num = 85.6;
    var mypdpx = null;
    function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');

      if (navigator.mediaDevices) {
        // if navigator.mediaDevices exists, use it
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(function (stream) {
            video.srcObject = stream;
            video.play();
          })
          .catch(function (err) {
            console.log('An error occurred: ' + err);
          });
      } else {
        navigator.getUserMedia(
          { video: true, audio: false },
          function (stream) {
            video.srcObject = stream;
            video.play();
          },
          function (err) {
            console.log('An error occurred: ' + err);
          }
        );
      }

      // show and hide cursor when draging points through eyes
      const showHideCursor = function (elm, evnt) {
        elm.addEventListener(evnt, function (e) {
          elm.addEventListener('mousemove', function (e) {
            e.target.style.cursor = evnt === 'mousedown' ? 'none' : 'unset';
          });
        });
      };

      showHideCursor(drag1, 'mousedown');
      showHideCursor(drag1, 'mouseup');
      showHideCursor(drag2, 'mousedown');
      showHideCursor(drag2, 'mouseup');

      // controll points with arrows
      function init() {
        drag1.style.position = 'absolute';
        drag1.style.left = '250px';
        drag1.style.top = '100px';
        drag2.style.position = 'absolute';
        drag2.style.left = '300px';
        drag2.style.top = '100px';
      }
      init();
      function getArrowAndMove(e, elm) {
        var key_code = e.id;
        console.log(key_code);
        switch (key_code) {
          case 'left':
            moveLeft(elm);
            break;
          case 'up':
            moveUp(elm);
            break;
          case 'right':
            moveRight(elm);
            break;
          case 'down':
            moveDown(elm);
            break;
        }
      }
      function moveLeft(element) {
        element.style.left = parseInt(element.style.left) - 2 + 'px';
      }
      function moveUp(element) {
        element.style.top = parseInt(element.style.top) - 2 + 'px';
      }
      function moveRight(element) {
        element.style.left = parseInt(element.style.left) + 2 + 'px';
      }
      function moveDown(element) {
        element.style.top = parseInt(element.style.top) + 2 + 'px';
      }

      if (leftControllContainer) {
        leftControllContainer.addEventListener('click', (e) => {
          const arrow = e.target.closest('span');
          if (!arrow) return;
          getArrowAndMove(arrow, drag1);
        });
      }
      if (rightControllContainer) {
        rightControllContainer.addEventListener('click', (e) => {
          const arrow = e.target.closest('span');
          if (!arrow) return;
          getArrowAndMove(arrow, drag2);
        });
      }

      video.addEventListener(
        'canplay',
        function (ev) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
          }
        },
        false
      );

      startbutton.addEventListener(
        'click',
        function (ev) {
          capture = document.getElementById('capture');
          takepicture();
          canvas.style.pointerEvents = 'unset';
          if (video.paused == true) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 1;
          }
          leftControllContainer.classList.remove('hidden');
          rightControllContainer.classList.remove('hidden');
          dist.classList.remove('hidden');
          drag1.classList.remove('hidden');
          drag2.classList.remove('hidden');
          ccSelect.classList.remove('hidden');
          rslt.classList.remove('hidden');
          ev.preventDefault();
          ev.target.remove();
          capture.remove();
        },
        false
      );

      clearphoto();
    }

    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL('image/png');
    }
    function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
      } else {
        clearphoto();
      }
    }
    dist.addEventListener('click', msDistance);
    function msDistance() {
      const div1rect = drag1.getBoundingClientRect();
      const div2rect = drag2.getBoundingClientRect();
      const div3rect = ccSelect.getBoundingClientRect();

      // get div1's center point
      const div1x = div1rect.left + div1rect.width / 2;
      const div1y = div1rect.top + div1rect.height / 2;

      // get div2's center point
      const div2x = div2rect.left + div2rect.width / 2;
      const div2y = div2rect.top + div2rect.height / 2;

      // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
      const distanceSquared =
        Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
      const distance = Math.sqrt(distanceSquared);
      const beforpd = (distance * 85.6) / div3rect.width;
      const pd = beforpd.toFixed(2);
      YPdIs.textContent = ` pd : ${pd}mm`;
    }
    startup();
  });

const closePdMeasure = () => {
  containerPdMeasure.classList.remove('active_measure');
  document.body.classList.remove('noscroll');
};
if (containerPdMeasure) {
  closePdBtn.addEventListener('click', closePdMeasure);
  closePdOverlay.addEventListener('click', closePdMeasure);
}

// mirror try on

const mirrortryOnContainer = document.querySelector('.try__on__overlay');
const tryOnStartBtn = document.querySelector('.try__on__start_btn');
const tryOnCloseBtn = document.querySelector('.close_try_on');
const tryOnCloseOverlay = document.querySelector('.overlay_try_on');

const startTryOn = () => {
  mirrortryOnContainer.classList.add('active_tryon_mirror');
  document.body.classList.add('noscroll');
  mirrorTryOn();
};
const stopTryOn = () => {
  JEELIZVTOWIDGET.pause();
  mirrortryOnContainer.classList.remove('active_tryon_mirror');
  document.body.classList.remove('noscroll');
  mirrorTryOn();
};
if (mirrortryOnContainer) {
  tryOnStartBtn.addEventListener('click', startTryOn);
  tryOnCloseBtn.addEventListener('click', stopTryOn);
  tryOnCloseOverlay.addEventListener('click', stopTryOn);
}

const navPanel = document.querySelector('.nav_panel');
const tabLinks = document.querySelectorAll('.nav_panel_link');
const tabSetting = document.querySelectorAll('.setting');

if (navPanel) {
  const current = location.href.split('#')[1];
  const links = document.querySelectorAll('.nav_panel_link'),
    tabs = document.querySelectorAll(`.setting`);
  tabs.forEach((tab) => {
    if (tab.id === current) {
      tab.classList.add('active');
    }
  });
  links.forEach((link) => {
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  navPanel.addEventListener('click', function (e) {
    const clicked = e.target.closest('.nav_panel_link');

    if (!clicked) return;
    tabLinks.forEach((t) => t.classList.remove('active'));
    tabSetting.forEach((t) => t.classList.remove('active'));
    clicked.classList.add('active');
    document
      .querySelector(`.setting--${clicked.dataset.tab}`)
      .classList.add('active');
  });
}
// banner
const bannerImg = document.querySelector('.banner-img');

if (bannerImg) {
  bannerImg.addEventListener('change', function (e) {
    const label = e.target.closest('label');
    const labeltext = e.target.closest('label').querySelector('span');
    const curFiles = e.target.files;
    for (const file of curFiles) {
      if (label.childNodes.length === 3) {
        label.removeChild(label.lastElementChild);
      }
      const url = URL.createObjectURL(file);
      const image = `<img src=${url} alt="">`;
      label.insertAdjacentHTML('beforeend', image);
      labeltext.textContent = 'change';
    }
  });
}
const collectionImg = document.querySelector('.collection-img');
if (collectionImg) {
  collectionImg.addEventListener('change', function (e) {
    const label = e.target.closest('label');
    const labeltext = e.target.closest('label').querySelector('span');
    const curFiles = e.target.files;
    for (const file of curFiles) {
      if (label.childNodes.length === 3) {
        label.removeChild(label.lastElementChild);
      }
      const url = URL.createObjectURL(file);
      const image = `<img src=${url} alt="">`;
      label.insertAdjacentHTML('beforeend', image);
      labeltext.textContent = 'change';
    }
  });
}
const categoryImg = document.querySelector('.category-img');
if (categoryImg) {
  categoryImg.addEventListener('change', function (e) {
    const label = e.target.closest('label');
    const labeltext = e.target.closest('label').querySelector('span');
    const curFiles = e.target.files;
    for (const file of curFiles) {
      if (label.childNodes.length === 3) {
        label.removeChild(label.lastElementChild);
      }
      const url = URL.createObjectURL(file);
      const image = `<img src=${url} alt="">`;
      label.insertAdjacentHTML('beforeend', image);
      labeltext.textContent = 'change';
    }
  });
}

const dropDownLanguage = document.querySelector('.drop-down-language');
const languageList = document.querySelector('.language-list');

if (dropDownLanguage) {
  dropDownLanguage.addEventListener('click', function (e) {
    e.preventDefault();
    languageList.classList.toggle('hidden');
  });
}

// admin lenses

const addLenseTypeBtn = document.querySelector('.add_lense_type_btn');
const addThiknessBtn = document.querySelector('.add_thikness_btn');
const addAdvancedBtn = document.querySelector('.add_advanced_btn');

if (addLenseTypeBtn) {
  addLenseTypeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const parentType = e.target.parentElement;
    const typeHtml = `
          <div class="type">
                    <input class="lenses_type" type="text" name="lensType[${
                      parentType.childElementCount - 1
                    }][subtitle]" value=""  placeholder="name">
                    <textarea type="text" name="lensType[${
                      parentType.childElementCount - 1
                    }][desc]" placeholder="description" class="description_type_lense" ></textarea>
                  </div>       
    
    `;
    parentType.insertAdjacentHTML('beforeend', typeHtml);
  });
}
if (addThiknessBtn) {
  addThiknessBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const parentType = e.target.parentElement;
    const typeHtml = `

    <div class="thik">
    <input class="thikness_title" type="text" name="thickness[${
      parentType.childElementCount - 1
    }][subtitle]" value=""  placeholder="name">
    <textarea class="thikness_description" name="thickness[${
      parentType.childElementCount - 1
    }][desc]" value="" placeholder="description"></textarea>
    <input class="thikness_refraction" type="text" name="thickness[${
      parentType.childElementCount - 1
    }][refraction]" value="" placeholder="refraction">
    <input class="thikness_preview" type="file" name="thickness[${
      parentType.childElementCount - 1
    }][photo]" value="" placeholder="preview">
    <input class="thickness_price" type="number" name="thickness[${
      parentType.childElementCount - 1
    }][price]" value="" placeholder="price">
  </div>
    `;
    parentType.insertAdjacentHTML('beforeend', typeHtml);
  });
}
if (addAdvancedBtn) {
  addAdvancedBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const parentType = e.target.parentElement;
    const typeHtml = `
    <div class="adType">
    
    <input class="ad_type_title" type="text" name="advancedLensType[${
      parentType.childElementCount - 1
    }][subtitle]" value=""  placeholder="name">
    
    <textarea class="ad_type_description" name="advancedLensType[${
      parentType.childElementCount - 1
    }][desc]" value="" placeholder="description"></textarea>
                    <input class="ad_type_price" type="number" name="advancedLensType[${
                      parentType.childElementCount - 1
                    }][price]" value="" min='0' placeholder="price">
                  </div>
    `;
    parentType.insertAdjacentHTML('beforeend', typeHtml);
  });
}

const prodImgPrev = document.querySelector('.product_imgs');

if (prodImgPrev) {
  prodImgPrev.addEventListener('click', function (e) {
    const fileInput = e.target.closest('input');
    if (!fileInput) return;
    fileInput.addEventListener('change', function (e) {
      const label = e.target.closest('label');
      const curFiles = e.target.files;
      for (const file of curFiles) {
        if (label.childNodes.length === 2) {
          label.removeChild(label.lastElementChild);
        }
        const url = URL.createObjectURL(file);
        const image = `<img src=${url} alt="">`;
        label.insertAdjacentHTML('beforeend', image);
      }
    });
  });
}

const close_ann = document.querySelectorAll('.close_ann');

if (close_ann) {
  close_ann.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.target.parentElement.remove();
    });
  });
}

const forggotPassBtn = document.querySelector('.forggot_password_btn');
const forggotPasswordForm = document.querySelector('.forggot_password');

if (forggotPassBtn)
  forggotPassBtn.addEventListener('click', function () {
    forggotPasswordForm.style.visibility = 'inherit';
  });

// dashbord navigation toggle

const navigationContainer = document.querySelector('.navigation');
const toggleNavBtn = document.querySelector('.toggle_nav');

const toogleDashboardNavigation = () => {
  if (navigationContainer) {
    navigationContainer.classList.toggle('hidd');
  }
};
if (toggleNavBtn) {
  toggleNavBtn.addEventListener('click', toogleDashboardNavigation);
}

const actionsOverlay = document.querySelector('.actions_overlay'),
  overlayDiv = document.querySelector('.overlay'),
  hiddOverlayBtn = document.querySelector('.hidd_overlay'),
  actionAdd = document.querySelector('.action_add'),
  addSimpleBtn = document.querySelectorAll('.add_simple_btn');

const showOverlay = (action) => {
  if (action === 'add') {
    actionsOverlay.classList.add('active');
    actionAdd.classList.add('active');
  }
};
const hiddOverlay = () => {
  actionsOverlay.classList.remove('active');
  actionAdd.classList.remove('active');
};

if (overlayDiv) {
  overlayDiv.addEventListener('click', hiddOverlay);
}
if (hiddOverlayBtn) {
  hiddOverlayBtn.addEventListener('click', hiddOverlay);
}

if (addSimpleBtn) {
  addSimpleBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showOverlay('add');
    });
  });
}

const toggleBtn = document.querySelector('.toggle_side_menu');
if (toggleBtn) {
  toggleBtn.addEventListener('click', (e) => {
    document.querySelector('.panel_navigation').classList.toggle('active');
  });
}
