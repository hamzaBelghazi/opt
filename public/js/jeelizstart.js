let _isResized = false;
function test_resizeCanvas() {
  // halves the height:
  let halfHeightPx = Math.round(window.innerHeight / 2).toString() + 'px';

  const domWidget = document.getElementById('JeelizVTOWidget');
  domWidget.style.maxHeight = _isResized ? 'none' : halfHeightPx;

  _isResized = !_isResized;
}

// entry point:
function mirrorTryOn() {
  JEELIZVTOWIDGET.start({
    searchImageMask: '/assets/loading.png',
    searchImageColor: 0xeeeeee,
    callbackReady: function () {
      const { ver } = document.querySelector('.ver__btn').dataset;
      JEELIZVTOWIDGET.load_modelStandalone(`/img/tryon/${ver}`);
    },
    onError: function (errorLabel) {
      alert('An error happened. errorLabel =' + errorLabel);
      switch (errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          break;

        case 'NOFILE':
          break;

        case 'WRONGFILEFORMAT':
          break;

        case 'INVALID_SKU':
          break;

        case 'FALLBACK_UNAVAILABLE':
          break;

        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          break;

        case 'FATAL':
        default:
          break;
      }
    },
  });
}

function load_modelBySKU() {
  const sku = prompt(
    'Please enter a glasses model SKU:',
    'rayban_wayfarer_havane_marron'
  );
  if (sku) {
    JEELIZVTOWIDGET.load(sku);
  }
}
