'use strict';

(function () {
  var map = document.querySelector('.map');

  function pinPopupOpen(pinOnMap, advertise) {
    pinOnMap.addEventListener('click', function pinClickHandler() {
      var advertiseAll = document.querySelectorAll('.map__card');
      for (var i = 0; i < advertiseAll.length; i++) {
        var advertiseOne;
        advertiseAll[i].remove();
      }
      advertiseOne = map.appendChild(window.card.createCard(advertise));
      adCloseClickHandler(advertiseOne);
    });
  }

  function adCloseClickHandler(advertise) {
    var cardClose = advertise.querySelector('.popup__close');
    document.addEventListener('keydown', popupEscHandler);
    cardClose.addEventListener('click', removeCard);
  }

  function popupEscHandler(evt) {
    window.util.isEscEvent(evt, removeCard);
  }

  function removeCard() {
    var card = document.querySelector('.map__card');
    card.remove();
    document.removeEventListener('keydown', popupEscHandler);
  }

  window.popup = {
    pinPopupOpen: pinPopupOpen
  };

})();
