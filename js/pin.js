'use strict';

(function () {
  // var PIN_MAIN = document.querySelector('.map__pin--main');
  // var PIN_MAIN_END_HEIGHT = window.getComputedStyle(document.querySelector('.map__pin--main'), ':after').getPropertyValue('height');
  // var PIN_MAIN_WIDTH = PIN_MAIN.offsetWidth;
  // var PIN_MAIN_HEIGHT = PIN_MAIN.offsetHeight;

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pin = mapPins.querySelector('.map__pin');
  var pinWidth = pin.offsetWidth;
  var pinHeight = pin.offsetHeight;

  function renderPin(ad) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinElement.setAttribute('style', 'left: ' + (ad.location.x - pinWidth / 2) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;');
    pinImg.setAttribute('src', ad.author.avatar);
    pinElement.setAttribute('alt', ad.offer.title);
    return pinElement;
  }

  window.pin = {
    renderPin: renderPin
  };

})();
