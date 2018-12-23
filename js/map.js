'use strict';

(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var ads = window.data.generateAds();
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    fragment.appendChild(window.pin.renderPin(ad));
  });

  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');

  function toggleFieldsetDisabled(fieldset, disabled) {
    fieldsetAdForm.forEach(function (field) {
      field.disabled = disabled;
    });
  }

  toggleFieldsetDisabled(fieldsetAdForm, true);

  function activateMap() {
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    mapPins.appendChild(fragment);
    adForm.classList.remove('ad-form--disabled');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pinEach, index) {
      window.popup.pinPopupOpen(pinEach, ads[index]);
    });

    PIN_MAIN.removeEventListener('mouseup', activateMap);
  }

  PIN_MAIN.addEventListener('mouseup', activateMap);

})();
