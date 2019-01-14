'use strict';

(function () {
  var FILTERED_OFFERS_LENGTH = 5;
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var originalOffers;
  var filteredOffers;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var resetButton = document.querySelector('.ad-form__reset');
  var fragment = document.createDocumentFragment();
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');

  function trimOffers(offers) {
    return offers.slice(0, FILTERED_OFFERS_LENGTH);
  }

  function toggleFieldsetDisabled(fieldset, disabled) {
    fieldsetAdForm.forEach(function (field) {
      field.disabled = disabled;
    });
  }

  toggleFieldsetDisabled(fieldsetAdForm, true);

  function addCardsToMap(space, data) {
    data.forEach(function (element) {
      var pin = window.pin.render(element);
      fragment.appendChild(pin);
      window.popup.open(pin, element);
    });
    space.appendChild(fragment);
  }

  function activateMap() {
    originalOffers = window.load.getData();
    filteredOffers = trimOffers(window.load.getData());
    var ads = window.load.getData().slice(0, FILTERED_OFFERS_LENGTH);
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    adForm.classList.remove('ad-form--disabled');

    addCardsToMap(mapPins, ads);

    PIN_MAIN.removeEventListener('mouseup', activateMouseUpHandler);
    resetButton.addEventListener('click', window.form.resetHandler);
    bindFilters();
  }

  function deactivationMap() {
    toggleFieldsetDisabled(fieldsetAdForm, true);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.util.delete('.map__pin:not(.map__pin--main)');
    window.util.delete('.map__card');
    window.filter.reset();
    PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);
  }

  function activateMouseUpHandler() {
    activateMap();
  }

  function bindFilters() {
    filterForm.addEventListener('change', function (evt) {
      switch (evt.target.id) {
        case 'housing-type':
          window.filter.add('type', evt.target.value);
          break;
        case 'housing-rooms':
          window.filter.add('rooms', evt.target.value);
          break;
        case 'housing-price':
          window.filter.add('price', evt.target.value);
          break;
        case 'housing-guests':
          window.filter.add('guests', evt.target.value);
          break;
      }

      if (evt.target.checked) {
        window.filter.addFeature(evt.target.value);
      }
      if (evt.target.checked === false) {
        window.filter.removeFeature(evt.target.value);
      }
      window.util.delete('.map__pin:not(.map__pin--main)');
      window.util.delete('.map__card');
      addCardsToMap(window.map.mapPins, window.filter.apply(window.map.originalOffers()).slice(0, FILTERED_OFFERS_LENGTH));
    });
  }

  PIN_MAIN.addEventListener('mouseup', activateMouseUpHandler);

  window.map = {
    deactivation: deactivationMap,
    trimOffers: trimOffers,
    mapPins: mapPins,
    addCard: addCardsToMap,
    filterForm: filterForm,
    originalOffers: function () {
      return originalOffers;
    },
    filteredOffers: function () {
      return filteredOffers;
    }
  };
})();
