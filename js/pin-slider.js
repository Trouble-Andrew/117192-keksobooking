'use strict';

(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var PIN_MAIN_END_HEIGHT = window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('height');
  var PIN_MAIN_WIDTH = PIN_MAIN.offsetWidth;
  var PIN_MAIN_HEIGHT = PIN_MAIN.offsetHeight;
  var DEFAULT_PIN_LOCATION = '603, 462';
  var MAP_Y_MIN = 130;
  var MAP_Y_MAX = 630;
  var PADDING = 30;
  var overlay = document.querySelector('.map__overlay');
  var addressInput = document.querySelector('#address');

  function calculatePinPosition() {
    var pinMainPosition = {};
    pinMainPosition.left = parseInt(PIN_MAIN.style.left, 10) + Math.round(PIN_MAIN_WIDTH / 2);
    pinMainPosition.top = parseInt(PIN_MAIN.style.top, 10) + PIN_MAIN_HEIGHT + parseInt(PIN_MAIN_END_HEIGHT, 10);
    addressInput.value = pinMainPosition.left + ', ' + pinMainPosition.top;
    return pinMainPosition;
  }

  function defaultPinPosition() {
    addressInput.value = DEFAULT_PIN_LOCATION;
    PIN_MAIN.style.left = '570px';
    PIN_MAIN.style.top = '375px';
  }

  PIN_MAIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      PIN_MAIN.style.top = (PIN_MAIN.offsetTop - shift.y) + 'px';
      if (PIN_MAIN.offsetTop <= MAP_Y_MIN - PIN_MAIN_HEIGHT) {
        PIN_MAIN.style.top = MAP_Y_MIN - PIN_MAIN_HEIGHT + 'px';
      } else if (PIN_MAIN.offsetTop >= MAP_Y_MAX) {
        PIN_MAIN.style.top = MAP_Y_MAX + 'px';
      }
      PIN_MAIN.style.left = (PIN_MAIN.offsetLeft - shift.x) + 'px';
      if (PIN_MAIN.offsetLeft <= 0 - PIN_MAIN_WIDTH / 2) {
        PIN_MAIN.style.left = 0 - PIN_MAIN_WIDTH / 2 + 'px';
      } else if (PIN_MAIN.offsetLeft >= overlay.offsetWidth - PADDING) {
        PIN_MAIN.style.left = (overlay.offsetWidth - PADDING) + 'px';
      }

      calculatePinPosition();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.pinSlider = {
    pinPosition: defaultPinPosition
  };
})();
