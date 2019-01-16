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
  var dataArray = [];

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

  function successHandler(ad) {
    dataArray = ad.slice();

    originalOffers = dataArray;
    filteredOffers = trimOffers(dataArray);
    var ads = dataArray.slice(0, FILTERED_OFFERS_LENGTH);

    window.filter.toggle(false);
    map.classList.remove('map--faded');
    toggleFieldsetDisabled(fieldsetAdForm, false);
    adForm.classList.remove('ad-form--disabled');

    addCardsToMap(mapPins, ads);

    PIN_MAIN.removeEventListener('mouseup', activateMouseUpHandler);
    resetButton.addEventListener('click', window.form.resetHandler);

    bindFilters();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635; color: #ffffff;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function activateMap() {
    window.backend.load(successHandler, errorHandler);
  }

  function deactivationMap() {
    toggleFieldsetDisabled(fieldsetAdForm, true);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.util.delete('.map__pin:not(.map__pin--main)');
    window.util.delete('.map__card');
    window.filter.reset();
    window.filter.toggle(true);
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

      function addFilteredAd() {
        window.util.delete('.map__pin:not(.map__pin--main)');
        window.util.delete('.map__card');
        addCardsToMap(window.map.mapPins, window.filter.apply(window.map.originalOffers()).slice(0, FILTERED_OFFERS_LENGTH));
      }

      window.util.debounce(addFilteredAd);
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
