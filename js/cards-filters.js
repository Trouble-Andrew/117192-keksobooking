'use strict';


(function () {
  var mapElem = document.querySelector('.map');

  var filtersForm = mapElem.querySelector('.map__filters');
  var featureCheckboxElems = filtersForm.querySelectorAll('input[type="checkbox"]');
  var selectElems = filtersForm.querySelectorAll('select');
  var fragment = document.createDocumentFragment();

  var PRICE_RANGES = {
    low: 10000,
    high: 50000
  };

  var checkType = function (offerType, filtersType) {
    return filtersType === 'any' || filtersType === offerType.toString();
  };

  var getRentCostRange = function (offerRentCost) {
    if (offerRentCost < PRICE_RANGES.low) {
      return 'low';
    } else if (offerRentCost >= PRICE_RANGES.high) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var checkRentCost = function (offerRentCost, filtersCost) {
    return filtersCost === 'any' || filtersCost === getRentCostRange(offerRentCost);
  };

  var checkFeatures = function (offerFeatures, neededFeatures) {
    return neededFeatures.every(function (feature) {
      return offerFeatures.indexOf(feature) > -1;
    });
  };

  var handleFiltering = function (filteredRents) {
    window.util.delete('.map__pin:not(.map__pin--main)');
    window.util.delete('.map__card');
    for (var i = 0; i < filteredRents.length; i++) {
      var pin = window.pin.render(filteredRents[i]);
      fragment.appendChild(pin);
      window.popup.open(pin, filteredRents[i]);
    }
    window.map.mapPins.appendChild(fragment);
  };

  var filtersFormChangeHandler = function () {
    selectElems.forEach(function (selectElem) {
      selectElem.dataset.feature = selectElem.id.replace(/housing-/i, '');
    });

    var filters = Array.from(selectElems).reduce(function (acc, selectedOption) {
      var optionName = selectedOption.dataset.feature;
      acc[optionName] = selectedOption.options[selectedOption.selectedIndex].value;

      return acc;
    }, {});

    filters.features = Array.from(featureCheckboxElems)
        .filter(function (checkedBox) {
          return checkedBox.checked;
        })
        .map(function (checkedBox) {
          return checkedBox.value;
        });


    var allFilteredOffers = window.map.originalOffers().filter(function (rent) {
      return checkType(rent.offer.type, filters.type) &&
        checkType(rent.offer.rooms, filters.rooms) &&
        checkType(rent.offer.guests, filters.guests) &&
        checkRentCost(rent.offer.price, filters.price) &&
        checkFeatures(rent.offer.features, filters.features);
    });

    window.map.filteredOffers = window.map.trimOffers(allFilteredOffers);
    handleFiltering(window.map.filteredOffers);
  };


  filtersForm.addEventListener('change', function () {
    window.util.debounce(filtersFormChangeHandler);
  });
})();
