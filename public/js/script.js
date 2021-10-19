const wrapper = document.querySelector('.wrapper');
const navBar = document.querySelector('.header');
const hero = document.querySelector('.hero');

const tabContainer = document.querySelector('.operations__tab-container');
const tabbuttons = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

const logoTransition = function () {
  const logo = document.querySelector('.logo_text');
  const logoArray = logo.textContent.split('');
  logo.textContent = logoArray[0] + logoArray[logoArray.length - 1];
};

const menuToggel = function () {
  const closeMenu = document.querySelector('.close--menu');
  const menuBtn = document.querySelector('.menu-toggle');

  const showHideMenu = () => {
    wrapper.classList.toggle('move--right');
  };
  wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('move--right')) showHideMenu();
  });
  menuBtn.addEventListener('click', showHideMenu);
  closeMenu.addEventListener('click', showHideMenu);
};
const searchToggle = function () {
  const searchbox = document.querySelector('.search--bar');
  const searchOpen = document.querySelector('.search');
  const inputS = document.querySelector('.search_input');
  const searchClose = document.querySelector('.search--close');

  function show() {
    searchbox.style.visibility = 'inherit';
    inputS.focus();
  }
  function hide() {
    searchbox.style.visibility = 'hidden';
  }

  searchOpen.addEventListener('click', show);
  searchClose.addEventListener('click', hide);
};

const openCart = function () {
  const wrapper = document.querySelector('.wrapper');
  const cart = document.querySelector('.cart');
  const cartOpen = document.querySelector('.cart--toggle');
  const cartClose = document.querySelector('.close--cart');

  function showhide() {
    cart.classList.toggle('inhirt');
    wrapper.classList.toggle('move--left');
  }
  cartOpen.addEventListener('click', showhide);
  cartClose.addEventListener('click', showhide);
};
const openLoging = function () {
  const loginOpen = document.querySelector('.account--login');
  const loginContainer = document.querySelector('.loging--dropdown');
  function show() {
    loginOpen.style.background = 'rgb(49, 137, 244)';
    loginContainer.style.visibility = 'inherit';
    loginOpen.style.color = 'white';
  }
  function hide() {
    loginContainer.style.visibility = 'hidden';
    loginOpen.style.background = 'initial';
    loginOpen.style.color = 'rgb(49, 137, 244)';
  }

  loginOpen.addEventListener('mouseover', show);
  loginOpen.addEventListener('mouseout', hide);
  loginContainer.addEventListener('mouseover', show);
  loginContainer.addEventListener('mouseout', hide);
};

const slider = function () {
  const sliderContainer = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const nextSlidebtn = document.querySelector('.slider__btn--right');
  const prevSlidebtn = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  const sliderContainer2 = document.querySelector('.slider2');
  const slides2 = document.querySelectorAll('.slide2');
  const nextSlidebtn2 = document.querySelector('.slider__btn--right2');
  const prevSlidebtn2 = document.querySelector('.slider__btn--left2');

  const init = function () {
    creatDots();
    activetDot(currSlide);
    movSlides(slides, currSlide);
  };
  const creatDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="dots__dot" data-slide='${i}'></div>
      `
      );
    });
  };

  const activetDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');

    dots.forEach((d) => {
      d.classList.remove('dots__dot--active');
    });
    const active = document.querySelector(`.dots__dot[data-slide='${slide}']`);
    if (active) active.classList.add('dots__dot--active');
  };

  let maxSlide = slides.length;
  let maxSlide2 = slides2.length;

  let currSlide = 0;
  let currSlide2 = 0;

  const movSlides = function (slidesitem, slide) {
    slidesitem.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlid = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    movSlides(slides, currSlide);
    activetDot(currSlide);
  };

  const prevSlid = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    movSlides(slides, currSlide);
    activetDot(currSlide);
  };
  // slide 2
  const nextSlid2 = function () {
    if (currSlide2 === maxSlide2 - 1) {
      currSlide2 = 0;
    } else {
      currSlide2++;
    }
    movSlides(slides2, currSlide2);
  };

  const prevSlid2 = function () {
    if (currSlide2 === 0) {
      currSlide2 = maxSlide2 - 1;
    } else {
      currSlide2--;
    }
    movSlides(slides2, currSlide2);
  };
  // btn events handlers

  if (nextSlidebtn) nextSlidebtn.addEventListener('click', nextSlid);
  if (prevSlidebtn) prevSlidebtn.addEventListener('click', prevSlid);

  if (nextSlidebtn2) nextSlidebtn2.addEventListener('click', nextSlid2);
  if (prevSlidebtn2) prevSlidebtn2.addEventListener('click', prevSlid2);

  let theInterval;

  function startSlide() {
    theInterval = setInterval(nextSlid, 3000);
  }

  function stopSlide() {
    clearInterval(theInterval);
  }
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseleave', startSlide);
    sliderContainer.addEventListener('mouseover', stopSlide);
  }
  if (sliderContainer2) {
    sliderContainer2.addEventListener('mouseleave', startSlide);
    sliderContainer2.addEventListener('mouseover', stopSlide);
  }

  // let presed;
  // let startX;
  // let x;

  // sliderContainer.addEventListener("mousedown", function (e) {
  //   presed = true;
  //   startX = e.offsetX - slides[currSlide].offsetLeft;
  // });
  // sliderContainer.addEventListener("mouseup", function (e) {
  //   presed = false;
  // });
  // sliderContainer.addEventListener("mousemove", function (e) {
  //   if (!presed) return;
  //   e.preventDefault();
  //   x = e.offsetX;
  //   if (x > startX) nextSlid();
  //   if (x < startX) prevSlid();
  // });
  // keypress
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlid();
    e.key === 'ArrowLeft' && prevSlid();
  });
  //dots handler

  if (dotContainer)
    dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        slides.forEach((s, i) => {
          s.style.transform = `translateX(${100 * (i - slide)}%)`;
          activetDot(slide);
        });
      }
    });
  init();
};
const filterBtn = document.querySelector('.filter_btn');
const filterContainer = document.querySelector('.filter_container');
const allProductContainer = document.querySelector('.all_products');

const openFilter = function () {
  if (!filterBtn || !filterContainer) return;
  function toggleFilter() {
    allProductContainer.classList.toggle('filter_open');
  }
  filterBtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggleFilter();
  });
};

openFilter();

const obsNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};
const navHeight = navBar.getBoundingClientRect().height;
const headerObserv = new IntersectionObserver(obsNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

if (hero) headerObserv.observe(hero);

const allSections = document.querySelectorAll('.section');
const showSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const obsSection = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((s) => {
  obsSection.observe(s);
  s.classList.add('section--hidden');
});

// product slider
const productSlider = function () {
  const slider = document.querySelector('.all_product_preview');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });

  //   touchEvents

  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('touchend', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('touchcancel', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return; // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
};

if (window.screen.width <= '540') {
  logoTransition();
}

menuToggel();
slider();
searchToggle();
openLoging();
openCart();
productSlider();

/////////////////////////////
// jeeliz

const tryOneBtn = document.querySelector('.try_on_btn');
const tryOnContainer = document.querySelector('.try_on_container');
const closeTryOn = document.querySelector('.close_try_on');

if (tryOneBtn) {
  tryOneBtn.addEventListener('click', function (e) {
    e.preventDefault();
    tryOnContainer.classList.add('open');
    setTimeout(function () {
      main();
    }, 3000);
  });
}
if (closeTryOn) {
  closeTryOn.addEventListener('click', function () {
    JEELIZVTOWIDGET.pause();
    tryOnContainer.classList.remove('open');
  });
}
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
let i = 0;

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
        if (elementPrev.classList[0].includes('spd'))
          elementPrev.textContent = e.target.value + 'mm';
        else elementPrev.textContent = e.target.value;

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
          customThikPrice.textContent = targetIlement.dataset.p;
          thikPrice = Number(targetIlement.dataset.p);
          customTotalPrice.textContent = totalPrice + thikPrice + altPrice;
        }
        if (paramsType === 'advancedLensesType') {
          customAltPrice.textContent = targetIlement.dataset.p;
          altPrice = Number(targetIlement.dataset.p);
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
const cam = document.querySelector('.pd-content');
const tryof = document.querySelector('.close-pd');
const drag1 = document.querySelector('#drag-1');
const drag2 = document.querySelector('#drag-2');
const ccSelect = document.querySelector('#select-cc');
const dist = document.querySelector('.dist');
const YPdIs = document.querySelector('.your-pd');
const rslt = document.querySelector('.rslt');

if (tryon)
  tryon.addEventListener('click', () => {
    if (cam.classList.contains('hidden')) {
      cam.classList.remove('hidden');
      wrapper.style.position = 'fixed';
    }

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.moxGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    let width = 0;
    if (document.documentElement.clientWidth < 560) {
      width = 320;
    } else {
      width = 560;
    }
    // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream
    let pdNext = document.querySelector('.pd-next');
    let pdFinal = document.querySelector('.pd-final');
    let streaming = false;
    let textGuid = document.querySelector('.guid-text');
    let video = null;
    let canvas = null;
    let context = null;
    let photo = null;
    let capture = null;
    let startbutton = null;
    let wcard = null;
    let num = 85.6;
    let mypdpx = null;
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
          .catch(function (err) {});
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

      drag1.addEventListener('mousedown', (e) => {
        drag1.addEventListener('mousemove', (e) => {
          e.target.style.cursor = 'none';
        });
      });
      drag1.addEventListener('mouseup', (e) => {
        drag1.addEventListener('mousemove', (e) => {
          e.target.style.cursor = 'unset';
        });
      });
      drag2.addEventListener('mousedown', () => {
        drag2.addEventListener('mousemove', (e) => {
          e.target.style.cursor = 'none';
        });
      });
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
          drag1.classList.remove('hidden');
          drag2.classList.remove('hidden');
          ccSelect.classList.remove('hidden');
          rslt.classList.remove('hidden');
          ev.preventDefault();
          capture.remove();
        },
        false
      );
      const rangeInput = document.querySelector('.range-input');
      const panzoom = Panzoom(canvas, {
        minScale: 0.1,
        maxScale: 4,
        increment: 0.1,
        liner: true,
      });
      rangeInput.addEventListener('input', (event) => {
        panzoom.zoom(event.target.valueAsNumber);
      });
      clearphoto();
    }

    function clearphoto() {
      context = canvas.getContext('2d');
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
        // photo.src = data;
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

    tryof.addEventListener('click', () => {
      wrapper.style.position = 'relative';
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.classList.add('hidden');
      cam.classList.add('hidden');
    });

    startup();
  });

// dragresize

interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: 'parent',
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
  },
  // enable autoScroll
  autoScroll: true,

  onstart: function (event) {
    // console.log('onstart');
  },

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    // console.log("end");
  },
});

function dragMoveListener(event) {
  // console.log("dragMoveListener");
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
// target elements with the "draggable" class

interact('.drag-resiz')
  .resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    invert: 'reposition',
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset;

        x = (parseFloat(x) || 0) + event.deltaRect.left;
        y = (parseFloat(y) || 0) + event.deltaRect.top;

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`,
        });

        Object.assign(event.target.dataset, { x, y });
      },
    },
  })
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: 'parent',
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    },
    // enable autoScroll
    autoScroll: true,

    onstart: function (event) {
      // console.log("onstart");
    },

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      // console.log("onend");
      // var textEl = event.target.querySelector("p");
      // textEl && (textEl.textContent = "moved a distance of " + (Math.sqrt(event.dx * event.dx + event.dy * event.dy) | 0) + "px");
    },
  });

function dragMoveListener(event) {
  // console.log("dragMoveListener");
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the position attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

const navPanel = document.querySelector('.nav_panel');
const tabLinks = document.querySelectorAll('.nav_panel_link');
const tabSetting = document.querySelectorAll('.setting');

if (navPanel)
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
