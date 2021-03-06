'use strict';

(function () {
  var ONE_GUEST = 1;
  var ONE_ROOM = 1;
  var FIVE_ROOMS = 5;

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  function defineApartmentsType(element) {
    var apartmentsType;
    if (element.offer.type === 'flat') {
      apartmentsType = 'Квартира';
    } else if (element.offer.type === 'bungalo') {
      apartmentsType = 'Бунгало';
    } else if (element.offer.type === 'house') {
      apartmentsType = 'Дом';
    } else if (element.offer.type === 'palace') {
      apartmentsType = 'Дворец';
    }
    return apartmentsType;
  }

  function defineGuests(element) {
    var guestsTitle = element.offer.guests === ONE_GUEST ? ' гостя' : ' гостей';
    return guestsTitle;
  }

  function defineRooms(element) {
    var rooms = ' комнаты для ';
    if (element.offer.rooms === ONE_ROOM) {
      rooms = ' комната для ';
    } else if (element.offer.rooms === FIVE_ROOMS) {
      rooms = ' комнат для ';
    }
    return rooms;
  }

  function createCard(card) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var apartmentsType = defineApartmentsType(card);

    cardElement.querySelector('.popup__type').textContent = apartmentsType;

    var guests = defineGuests(card);
    var rooms = defineRooms(card);

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + rooms + card.offer.guests + guests;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var cardFeatures = cardElement.querySelector('.popup__features');

    window.util.remove(cardFeatures);

    card.offer.features.forEach(function (feature) {
      var newCardFeature = document.createElement('li');
      newCardFeature.classList.add('popup__feature', 'popup__feature--' + feature);
      fragment.appendChild(newCardFeature.cloneNode(true));
    });

    cardFeatures.appendChild(fragment);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var cardPhotos = cardElement.querySelector('.popup__photos');

    window.util.remove(cardPhotos);

    card.offer.photos.forEach(function (photo) {
      var newPhoto = document.createElement('img');
      newPhoto.className = 'popup__photo';
      newPhoto.setAttribute('width', '45');
      newPhoto.setAttribute('height', '40');
      newPhoto.setAttribute('alt', 'Фотография жилья');
      newPhoto.setAttribute('src', photo);
      fragment.appendChild(newPhoto);
    });

    cardPhotos.appendChild(fragment);

    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    var cardClose = cardElement.querySelector('.popup__close');
    cardClose.tabIndex = '0';

    return cardElement;
  }

  window.card = {
    create: createCard
  };

})();
