'use strict';

var PIN_MAIN = document.querySelector('.map__pin--main');

var map = document.querySelector('.map');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var pin = mapPins.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;

var ads = window.data.generateAds();

// function renderPin(ad) {
//   var pinElement = mapPinTemplate.cloneNode(true);
//   var pinImg = pinElement.querySelector('img');
//
//   pinElement.setAttribute('style', 'left: ' + (ad.location.x - pinWidth / 2) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;');
//   pinImg.setAttribute('src', ad.author.avatar);
//   pinElement.setAttribute('alt', ad.offer.title);
//
//   return pinElement;
// }

var fragment = document.createDocumentFragment();

ads.forEach(function (ad) {
  fragment.appendChild(window.pin.renderPin(ad));
});

var adForm = document.querySelector('.ad-form');
var fieldsetAdForm = adForm.querySelectorAll('fieldset');

function toggleFieldsetDisabled(fieldset, disabled) {
  fieldsetAdForm.forEach(function (field) {
    field.disabled = disabled;
  });
}

toggleFieldsetDisabled(fieldsetAdForm, true);

function activateMap() {
  map.classList.remove('map--faded');
  toggleFieldsetDisabled(fieldsetAdForm, false);
  mapPins.appendChild(fragment);
  adForm.classList.remove('ad-form--disabled');
  var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

  pins.forEach(function (pinEach, index) {
    window.popup.pinPopupOpen(pinEach, ads[index]);
  });

  PIN_MAIN.removeEventListener('mouseup', activateMap);
}

PIN_MAIN.addEventListener('mouseup', activateMap);
