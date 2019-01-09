'use strict';

(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var OFFERS_QUANTITY = 5;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var resetButton = document.querySelector('.ad-form__reset');
  var fragment = document.createDocumentFragment();

  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');

  function toggleFieldsetDisabled(fieldset, disabled) {
    fieldsetAdForm.forEach(function (field) {
      field.disabled = disabled;
    });
  }

  toggleFieldsetDisabled(fieldsetAdForm, true);

  function activateMap() {
    var ads = window.load.getData().slice(0, OFFERS_QUANTITY);
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < ads.length; i++) {
      var pin = window.pin.render(ads[i]);
      fragment.appendChild(pin);
      window.popup.open(pin, ads[i]);
    }
    mapPins.appendChild(fragment);

    PIN_MAIN.removeEventListener('mouseup', activateMouseUpHandler);
    resetButton.addEventListener('click', window.form.resetHandler);
  }

  function deactivationMap() {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
    PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);
  }

  function activateMouseUpHandler() {
    activateMap();
  }

  PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);

  window.map = {
    deactivation: deactivationMap
  };
})();
