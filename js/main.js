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

function defineAppartmentPrice() {
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

appartmentTypeSelect.addEventListener('change', defineAppartmentPrice, false);

function startGuests() {
  guestsOptions[0].disabled = true;
  guestsOptions[1].disabled = true;
  guestsOptions[2].disabled = false;
  guestsOptions[3].disabled = true;
}

function openGuests() {
  guestsOptions[0].disabled = false;
  guestsOptions[1].disabled = false;
  guestsOptions[2].disabled = false;
  guestsOptions[3].disabled = false;
}

function openRooms() {
  roomsOptions[0].disabled = false;
  roomsOptions[1].disabled = false;
  roomsOptions[2].disabled = false;
  roomsOptions[3].disabled = false;
}

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
        if (guestsOptions[3].selected) {
          guestsOptions[1].selected = true;
        } else if (guestsOptions[0].selected) {
          guestsOptions[1].selected = true;
        }
        // guestsOptions[1].selected = true;
      } else if (options.value === '3') {
        guestsOptions[0].disabled = false;
        guestsOptions[1].disabled = false;
        guestsOptions[2].disabled = false;
        guestsOptions[3].disabled = true;
        if (guestsOptions[3].selected) {
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

function defineRoomsQuantity() {
  guestsOptions.forEach(function (options) {
    if (options.selected === true) {
      if (options.value === '1') {
        roomsOptions[0].disabled = false;
        roomsOptions[1].disabled = false;
        roomsOptions[2].disabled = false;
        roomsOptions[3].disabled = true;
        if (roomsOptions[3].selected) {
          roomsOptions[0].selected = true;
        }
      } else if (options.value === '2') {
        roomsOptions[0].disabled = true;
        roomsOptions[1].disabled = false;
        roomsOptions[2].disabled = false;
        roomsOptions[3].disabled = true;
        roomsOptions[1].selected = true;
      } else if (options.value === '3') {
        roomsOptions[0].disabled = true;
        roomsOptions[1].disabled = true;
        roomsOptions[2].disabled = false;
        roomsOptions[3].disabled = true;
        roomsOptions[2].selected = true;
      } else if (options.value === '0') {
        roomsOptions[0].disabled = true;
        roomsOptions[1].disabled = true;
        roomsOptions[2].disabled = true;
        roomsOptions[3].disabled = false;
        roomsOptions[3].selected = true;
      }
    }
  });
}

roomSelect.addEventListener('change', defineGuestsQuantity, false);
roomSelect.addEventListener('click', openRooms);
guestsSelect.addEventListener('change', defineRoomsQuantity, false);
guestsSelect.addEventListener('click', openGuests);

function defineTimeInOut(evt) {
  if (evt.target.value === '12:00') {
    timeOutOptions[0].selected = true;
    timeInOptions[0].selected = true;
  } else if (evt.target.value === '13:00') {
    timeOutOptions[1].selected = true;
    timeInOptions[1].selected = true;
  } else if (evt.target.value === '14:00') {
    timeOutOptions[2].selected = true;
    timeInOptions[2].selected = true;
  }
}

timeInSelect.addEventListener('change', defineTimeInOut, false);
timeOutSelect.addEventListener('change', defineTimeInOut, false);
