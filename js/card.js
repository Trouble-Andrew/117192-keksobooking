'use strict';

(function () {
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
    var guests = ' гостей';
    if (element.offer.guests === 1) {
      guests = ' гостя';
    }
    return guests;
  }

  function defineRooms(element) {
    var rooms = ' комнаты для ';
    if (element.offer.rooms === 1) {
      rooms = ' комната для ';
    } else if (element.offer.rooms === 5) {
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

    window.util.removeChildren(cardFeatures);

    card.offer.features.forEach(function (i) {
      var newCardFeature = document.createElement('li');
      newCardFeature.classList.add('popup__feature', 'popup__feature--' + i);
      fragment.appendChild(newCardFeature.cloneNode(true));
    });

    cardFeatures.appendChild(fragment);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('.popup__photo');
    cardPhoto.setAttribute('src', card.offer.photos[0]);

    window.util.removeChildren(cardPhotos);

    card.offer.photos.forEach(function (i) {
      var newPhoto = document.createElement('img');
      newPhoto.className = 'popup__photo';
      newPhoto.setAttribute('width', '45');
      newPhoto.setAttribute('height', '40');
      newPhoto.setAttribute('alt', 'Фотография жилья');
      newPhoto.setAttribute('src', i);
      fragment.appendChild(newPhoto);
    });

    cardPhotos.appendChild(fragment);

    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    var cardClose = cardElement.querySelector('.popup__close');
    cardClose.tabIndex = '0';

    return cardElement;
  }

  window.card = {
    createCard: createCard
  };

})();
