'use strict';

var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;

var appartmentPrice = document.querySelector('#price');
var appartmentTypeSelect = document.querySelector('#type');
var apartmentsTypeOptions = appartmentTypeSelect.querySelectorAll('option');

var guestsSelect = document.querySelector('#capacity');
var guestsOptions = guestsSelect.querySelectorAll('option');
var roomSelect = document.querySelector('#room_number');
var roomsOptions = roomSelect.querySelectorAll('option');

var timeInSelect = document.querySelector('#timein');
var timeInOptions = timeInSelect.querySelectorAll('option');
var timeOutSelect = document.querySelector('#timeout');
var timeOutOptions = timeOutSelect.querySelectorAll('option');

function defineAppartmentPrice(evt) {
  apartmentsTypeOptions.forEach(function () {
    switch (evt.target.value) {
      case 'bungalo':
        appartmentPrice.minlength = BUNGALO_MIN_PRICE;
        appartmentPrice.placeholder = BUNGALO_MIN_PRICE;
        break;
      case 'flat':
        appartmentPrice.minlength = FLAT_MIN_PRICE;
        appartmentPrice.placeholder = FLAT_MIN_PRICE;
        break;
      case 'house':
        appartmentPrice.minlength = HOUSE_MIN_PRICE;
        appartmentPrice.placeholder = HOUSE_MIN_PRICE;
        break;
      case 'palace':
        appartmentPrice.minlength = PALACE_MIN_PRICE;
        appartmentPrice.placeholder = PALACE_MIN_PRICE;
        break;
    }
  });
}

appartmentTypeSelect.addEventListener('change', defineAppartmentPrice, false);

function startGuests() {
  guestsOptions[0].disabled = true;
  guestsOptions[1].disabled = true;
  guestsOptions[2].disabled = false;
  guestsOptions[3].disabled = true;
}

startGuests();

function defineGuestsQuantity() {
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
        if (guestsOptions[0].selected === true) {
          guestsOptions[1].selected = true;
        } else if (guestsOptions[3].selected === true) {
          guestsOptions[1].selected = true;
        }
      } else if (options.value === '3') {
        guestsOptions[0].disabled = false;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        if (guestsOptions[3].selected === true) {
          guestsOptions[0].selected = true;
        }
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

roomSelect.addEventListener('change', defineGuestsQuantity, false);

function changeTime(evt) {
  timeInSelect.value = evt.target.value;
  timeOutSelect.value = evt.target.value;
}

timeInSelect.addEventListener('change', changeTime, false);
timeOutSelect.addEventListener('change', changeTime, false);
