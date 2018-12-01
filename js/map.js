'use strict';

var AD_QUANTITY = 8;
var ROOMS_RANDOM = 5;
var MIN_PRICE_RANDOM = 1000;
var MAX_PRICE_RANDOM = 1000001;
var ADDRESS_RANDOM = 601;
var POSITION_Y1_RANDOM = 130;
var POSITION_Y2_RANDOM = 631;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapPinsSize = mapPins.offsetWidth;

var pin = document.querySelector('.map__pin');
var pinWidth = pin.offsetWidth;
var pinHeight = pin.offsetHeight;

var mapFilters = document.querySelector('.map__filters-container');

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function removeChildren(elem) {
  while (elem.lastChild) {
    elem.innerHTML = null;
  }
}

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

var authorData = {
  'author': {
    'avatar': 'img/avatars/user0' + '.png'
  },
  'userAvatarNum': [1, 2, 3, 4, 5, 6, 7, 8]
};

var offerData = {
  'offer': {
    'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    'address': '' + getRandom(1, ADDRESS_RANDOM) + ',' + ' ' + getRandom(1, ADDRESS_RANDOM),
    'price': getRandom(MIN_PRICE_RANDOM, MAX_PRICE_RANDOM),
    'type': ['palace', 'flat', 'house', 'bungalo'],
    'rooms': getRandom(1, ROOMS_RANDOM),
    'guests': getRandom(1, ROOMS_RANDOM * 2),
    'checkin': ['12:00', '13:00', '14:00'],
    'checkout': ['12:00', '13:00', '14:00'],
    'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    'description': ' ',
    'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  }
};

function generateAd(i) {
  var advertise = {};
  advertise.author = {};
  advertise.offer = {};
  advertise.location = {};
  advertise.author.avatar = 'img/avatars/user0' + authorData.userAvatarNum[i] + '.png';
  advertise.location.x = getRandom(0, mapPinsSize);
  advertise.location.y = getRandom(POSITION_Y1_RANDOM, POSITION_Y2_RANDOM);
  advertise.offer.title = offerData.offer.title[i];
  advertise.offer.address = advertise.location.x + ', ' + advertise.location.y;
  advertise.offer.price = getRandom(MIN_PRICE_RANDOM, MAX_PRICE_RANDOM);
  advertise.offer.type = offerData.offer.type[getRandom(0, offerData.offer.type.length)];
  advertise.offer.rooms = getRandom(1, ROOMS_RANDOM);
  advertise.offer.guests = getRandom(1, ROOMS_RANDOM * 2);
  advertise.offer.checkin = offerData.offer.checkin[getRandom(0, offerData.offer.checkin.length)];
  advertise.offer.checkout = offerData.offer.checkout[getRandom(0, offerData.offer.checkout.length)];
  advertise.offer.features = offerData.offer.features;
  advertise.offer.description = ' ';
  advertise.offer.photos = offerData.offer.photos;

  return advertise;
}

function generateAds() {
  var advertises = [];
  for (var i = 0; i < AD_QUANTITY; i++) {
    advertises[i] = generateAd(i);

    advertises[i].offer.photos = shuffle(advertises[i].offer.photos);

    advertises[i].offer.features = shuffle(advertises[i].offer.features).slice(0, getRandom(1, advertises[i].offer.features.length));
  }
  return advertises;
}

var ads = generateAds();

function renderPin(ad) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + (ad.location.x - pinWidth / 2) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;');
  pinImg.setAttribute('src', ad.author.avatar);
  pinElement.setAttribute('alt', ad.offer.title);

  return pinElement;
}

var fragment = document.createDocumentFragment();

ads.forEach(function (ad) {
  fragment.appendChild(renderPin(ad));
});

mapPins.appendChild(fragment);


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
  // var cardFeature = cardElement.querySelector('.popup__feature');

  // var fragment = document.createDocumentFragment();
  removeChildren(cardFeatures);

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

  // var fragment = document.createDocumentFragment();
  removeChildren(cardPhotos);

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

  return cardElement;
}

map.insertBefore(createCard(ads[0]), mapFilters);
