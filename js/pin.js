'use strict';

(function () {
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
