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
    for (var i = 0; i < OFFERS_QUANTITY; i++) {
      if (window.load.getData()[i].offer) {
        fragment.appendChild(window.pin.render(window.load.getData()[i]));
      }
    }
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    mapPins.appendChild(fragment);
    adForm.classList.remove('ad-form--disabled');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pinEach, index) {
      window.popup.open(pinEach, window.load.getData()[index]);
    });

    PIN_MAIN.removeEventListener('mouseup', activateMouseUpHandler);
    resetButton.addEventListener('click', window.form.resetHandler);
  }

  function activateMouseUpHandler() {
    activateMap();
  }

  PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);

})();
