'use strict';

(function () {
  var map = document.querySelector('.map');

  function pinPopupOpen(pinOnMap, advertise) {
    pinOnMap.addEventListener('click', function pinClickHandler() {
      var advertiseAll = document.querySelectorAll('.map__card');

      advertiseAll.forEach(function (ad) {
        ad.remove();
      });

      var advertiseOne = map.appendChild(window.card.card(advertise));
      adCloseClickHandler(advertiseOne);
    });
  }

  function adCloseClickHandler(advertise) {
    var cardClose = advertise.querySelector('.popup__close');
    document.addEventListener('keydown', popupEscHandler);
    cardClose.addEventListener('click', removeClickHandler);
  }

  function popupEscHandler(evt) {
    window.util.isEscEvent(evt, removeCard);
  }

  function removeCard() {
    var card = document.querySelector('.map__card');
    card.remove();
    document.removeEventListener('keydown', popupEscHandler);
  }

  function removeClickHandler() {
    removeCard();
  }

  window.popup = {
    open: pinPopupOpen
  };

})();
