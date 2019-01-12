'use strict';

(function () {
  var map = document.querySelector('.map');

  function pinPopupOpen(pinOnMap, advertise) {
    pinOnMap.addEventListener('click', function pinClickHandler() {
      var advertiseAll = document.querySelectorAll('.map__card');
      advertiseAll.forEach(function (ad) {
        ad.remove();
        activePinRemover();
      });

      var advertiseOne = map.appendChild(window.card.card(advertise));
      pinOnMap.classList.add('map__pin--active');
      adCloseClickHandler(advertiseOne);
    });
  }

  function adCloseClickHandler(advertise) {
    var cardClose = advertise.querySelector('.popup__close');
    document.addEventListener('keydown', popupEscHandler);
    cardClose.addEventListener('click', removeClickHandler);
  }

  function popupEscHandler(evt) {
    window.util.pressEsc(evt, removeCard);
  }

  function removeCard() {
    var card = document.querySelector('.map__card');
    card.remove();
    activePinRemover();
    document.removeEventListener('keydown', popupEscHandler);
  }

  function removeClickHandler() {
    removeCard();
  }

  function activePinRemover() {
    var activePin = document.querySelectorAll('.map__pin--active');
    activePin.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  }


  window.popup = {
    open: pinPopupOpen
  };

})();
