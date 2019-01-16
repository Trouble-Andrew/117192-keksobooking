'use strict';


(function () {

  var PRICE_RANGES = {
    low: 10000,
    high: 50000
  };

  var filter = {
    rooms: 'any',
    type: 'any',
    price: 'any',
    guests: 'any',
    features: []
  };

  function checkType(offerType, filtersType) {
    return filtersType === 'any' || filtersType === offerType.toString();
  }

  function getRentCostRange(offerRentCost) {
    if (offerRentCost < PRICE_RANGES.low) {
      return 'low';
    } else if (offerRentCost >= PRICE_RANGES.high) {
      return 'high';
    }
    return 'middle';
  }

  function checkRentCost(offerRentCost, filtersCost) {
    return filtersCost === 'any' || filtersCost === getRentCostRange(offerRentCost);
  }

  function checkFeatures(offerFeatures, neededFeatures) {
    return neededFeatures.every(function (feature) {
      return offerFeatures.indexOf(feature) > -1;
    });
  }

  function reset() {
    window.map.filterForm.reset();
    filter = {
      rooms: 'any',
      type: 'any',
      price: 'any',
      guests: 'any',
      features: []
    };
  }

  function apply(array) {
    return array.filter(function (rent) {
      return checkType(rent.offer.type, filter.type) &&
        checkType(rent.offer.rooms, filter.rooms) &&
        checkType(rent.offer.guests, filter.guests) &&
        checkRentCost(rent.offer.price, filter.price) &&
        checkFeatures(rent.offer.features, filter.features);
    });
  }

  function add(type, value) {
    filter[type] = value;
  }

  function addFeature(value) {
    filter.features.push(value);
  }

  function removeFeature(value) {
    filter.features.splice(filter.features.indexOf(value), 1);
  }

  function toggleFiltersDisabled(toggle) {
    var mapSelects = window.map.filterForm.querySelectorAll('.map__filter');
    var mapFeature = window.map.filterForm.querySelector('.map__features');
    mapFeature.disabled = toggle;
    mapSelects.forEach(function (select) {
      select.disabled = toggle;
    });
  }

  window.filter = {
    add: add,
    addFeature: addFeature,
    removeFeature: removeFeature,
    apply: apply,
    reset: reset,
    toggle: toggleFiltersDisabled

  };
})();
