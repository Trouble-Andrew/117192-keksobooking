'use strict';

function defineAppartmentPrice() {
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var appartmentPrice = document.querySelector('#price');
  var appartmentTypeSelect = document.querySelector('#type');
  var apartmentsTypeOptions = appartmentTypeSelect.querySelectorAll('option');

  apartmentsTypeOptions.forEach(function (option) {
    if (option.selected === true) {
      if (option.value === 'bungalo') {
        appartmentPrice.minlength = BUNGALO_MIN_PRICE;
        appartmentPrice.placeholder = BUNGALO_MIN_PRICE;
      } else if (option.value === 'flat') {
        appartmentPrice.minlength = FLAT_MIN_PRICE;
        appartmentPrice.placeholder = FLAT_MIN_PRICE;
      } else if (option.value === 'house') {
        appartmentPrice.minlength = HOUSE_MIN_PRICE;
        appartmentPrice.placeholder = HOUSE_MIN_PRICE;
      } else if (option.value === 'palace') {
        appartmentPrice.minlength = PALACE_MIN_PRICE;
        appartmentPrice.placeholder = PALACE_MIN_PRICE;
      }
    }
  });
}

var appartmentTypeSelect = document.querySelector('#type');
appartmentTypeSelect.addEventListener('change', defineAppartmentPrice, false);

function defineGuestsQuantity() {
  var guestsSelect = document.querySelector('#capacity');
  var guestsOptions = guestsSelect.querySelectorAll('option');
  var roomSelect = document.querySelector('#room_number');
  var roomsOptions = roomSelect.querySelectorAll('option');

  roomsOptions.forEach(function (options) {
    if (options.selected === true) {
      if (options.value === '1') {
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = true;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        guestsOptions[2].selected = true;
      } else if (options.value === '2') {
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        guestsOptions[1].selected = true;
      } else if (options.value === '3') {
        guestsOptions[0].disabled = false;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        guestsOptions[0].selected = true;
      } else if (options.value === '100') {
        guestsOptions[0].disabled = true;
        guestsOptions[1].disabled = true;
        guestsOptions[2].disabled = true;
        guestsOptions[3].disabled = false;
        guestsOptions[3].selected = true;
      }
    }
  });
}

var roomSelect = document.querySelector('#room_number');
roomSelect.addEventListener('change', defineGuestsQuantity, false);

function defineTimeIn () {
  var timeInSelect = document.querySelector('#timein');
  var timeInOptions = timeInSelect.querySelectorAll('option');
  var timeOutSelect = document.querySelector('#timeout');
  var timeOutOptions = timeOutSelect.querySelectorAll('option');

  timeInOptions.forEach(function (option) {
    if (option.selected === true) {
      if (option.value === '12:00') {
        timeOutOptions[0].selected = true;
      } else if (option.value === '13:00') {
        timeOutOptions[1].selected = true;
      } else if (option.value === '14:00') {
        timeOutOptions[2].selected = true;
      }
    }
  });
}

function defineTimeOut () {
  var timeInSelect = document.querySelector('#timein');
  var timeInOptions = timeInSelect.querySelectorAll('option');
  var timeOutSelect = document.querySelector('#timeout');
  var timeOutOptions = timeOutSelect.querySelectorAll('option');

  timeOutOptions.forEach(function (option) {
    if (option.selected === true) {
      if (option.value === '12:00') {
        timeInOptions[0].selected = true;
      } else if (option.value === '13:00') {
        timeInOptions[1].selected = true;
      } else if (option.value === '14:00') {
        timeInOptions[2].selected = true;
      }
    }
  });
}

var timeInSelect = document.querySelector('#timein');
timeInSelect.addEventListener('change', defineTimeIn, false);

var timeOutSelect = document.querySelector('#timeout');
timeOutSelect.addEventListener('change', defineTimeOut, false);
