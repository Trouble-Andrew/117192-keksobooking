'use strict';

(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  // var ads = window.data.generateAds();
  var fragment = document.createDocumentFragment();

  // console.log(ads);
  // console.log(window.load.data);

  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');

  function toggleFieldsetDisabled(fieldset, disabled) {
    fieldsetAdForm.forEach(function (field) {
      field.disabled = disabled;
    });
  }

  toggleFieldsetDisabled(fieldsetAdForm, true);

  function activateMap() {
    console.log(window.load.data);
    window.load.data.forEach(function (ad) {
      if (ad.offer) {
        fragment.appendChild(window.pin.render(ad));
      }
    });
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    mapPins.appendChild(fragment);
    adForm.classList.remove('ad-form--disabled');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pinEach, index) {
      window.popup.open(pinEach, window.load.data[index]);
    });

    PIN_MAIN.removeEventListener('mouseup', activateMouseUpHandler);
    window.form.resetButton.addEventListener('click', window.form.resetClickHandler);
  }

  function activateMouseUpHandler() {
    activateMap();
  }

  PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);

})();
