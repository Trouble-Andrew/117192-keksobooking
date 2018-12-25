'use strict';

var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;

var appartmentPrice = document.querySelector('#price');
var appartmentTypeSelect = document.querySelector('#type');

var guestsSelect = document.querySelector('#capacity');
var guestsOptions = guestsSelect.querySelectorAll('option');
var roomSelect = document.querySelector('#room_number');
var roomsOptions = roomSelect.querySelectorAll('option');

var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

function apartmentChangeHandler(evt) {
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
}

appartmentTypeSelect.addEventListener('change', apartmentChangeHandler, false);

function startGuests() {
  guestsOptions[0].disabled = true;
  guestsOptions[1].disabled = true;
  guestsOptions[2].disabled = false;
  guestsOptions[3].disabled = true;
}

startGuests();

function roomsChangeHandler(evt) {
  switch (evt.target.value) {
    case '1':
      guestsOptions[0].disabled = true;
      guestsOptions[1].disabled = true;
      guestsOptions[2].disabled = false;
      guestsOptions[3].disabled = true;
      guestsOptions[2].selected = true;
      break;
    case '2':
      guestsOptions[0].disabled = true;
      guestsOptions[1].disabled = false;
      guestsOptions[2].disabled = false;
      guestsOptions[3].disabled = true;
      if (guestsOptions[0].selected === true) {
        guestsOptions[1].selected = true;
      } else if (guestsOptions[3].selected === true) {
        guestsOptions[1].selected = true;
      }
      break;
    case '3':
      guestsOptions[0].disabled = false;
      guestsOptions[1].disabled = false;
      guestsOptions[2].disabled = false;
      guestsOptions[3].disabled = true;
      if (guestsOptions[3].selected === true) {
        guestsOptions[0].selected = true;
      }
      break;
    case '100':
      guestsOptions[0].disabled = true;
      guestsOptions[1].disabled = true;
      guestsOptions[2].disabled = true;
      guestsOptions[3].disabled = false;
      guestsOptions[3].selected = true;
      break;
  }
}

roomSelect.addEventListener('change', roomsChangeHandler, false);

function changeTime(evt) {
  timeInSelect.value = evt.target.value;
  timeOutSelect.value = evt.target.value;
}

function timeChangeHandler(evt) {
  changeTime(evt);
}

timeInSelect.addEventListener('change', timeChangeHandler, false);
timeOutSelect.addEventListener('change', timeChangeHandler, false);
