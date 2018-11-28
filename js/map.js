'use strict';

var AD_QUANTITY = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mapPinsSize = getComputedStyle(mapPins).width;
var mapFilters = document.querySelector('.map__filters-container');

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var card = document.querySelector('.map__card');


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var authorData = {
  'author': {
    'avatar': 'img/avatars/user' + '0' + getRandom(0, AD_QUANTITY + 1) + '.png'
  },
  'userAvatarNum': [1, 2, 3, 4, 5, 6, 7, 8]
};

var offerData = {
  'offer': {
    'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    'address': '' + getRandom(1, 600) + ',' + ' ' +getRandom(1, 600),
    'price': getRandom(1000, 1000001),
    'type': ['palace', 'flat', 'house', 'bungalo'],
    'rooms': getRandom(1, 6),
    'guests': getRandom(1, 12),
    'checkin': ['12:00', '13:00', '14:00'],
    'checkout': ['12:00', '13:00', '14:00'],
    'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    'description': ' ',
    'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  }
};

var locationData = {
  'x': getRandom(0, mapPinsSize),
  'y': getRandom(130, 630)
};

function Author(i) {
  this.avatar = 'img/avatars/user' + '0' + authorData.userAvatarNum[i] + '.png'
}

function Offer(i) {
  this.title = offerData.offer.title[i],
  this.address = '' + getRandom(1, 600) + ',' + ' ' +getRandom(1, 600),
  this.price = getRandom(1000, 1000001),
  this.type = offerData.offer.type[getRandom(0, 4)],
  this.rooms = getRandom(1, 6),
  this.guests = getRandom(1, 12),
  this.checkin = offerData.offer.checkin[getRandom(0, 3)],
  this.checkout = offerData.offer.checkout[getRandom(0, 3)],
  this.features = offerData.offer.features,
  this.description = ' ',
  this.photos = shuffle(offerData.offer.photos)
}

function Position() {
  this.x = getRandom(0, 1200),
  this.y = getRandom(130, 630)
}

var randomizeOffer = function () {
    var offers = [];
    shuffle(authorData.userAvatarNum);
    shuffle(offerData.offer.title);
    shuffle(offerData.offer.photos);
    for (var i = 0; i < AD_QUANTITY; i++) {
      offers[i] = {};
      var author = new Author(i);
      var offer = new Offer(i);
      var position = new Position();
      offers[i].author = author;
      offers[i].offer = offer;
      offers[i].location = position;
      // offers[i].offer.photos = shuffle(offerData.offer.photos);
      // offers[i].offer.features.length = getRandom(1, 6);
    }
    return offers;
};

var renderPin = function (offers) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + offers.location.x + 'px; top: ' + offers.location.y + 'px;');
  pinImg.setAttribute('src', offers.author.avatar);
  pinElement.setAttribute('alt', offers.offer.title);

  return pinElement;
};

var offers = randomizeOffer();
console.log(offers);

console.log(offers[0].offer.features);
offers[0].offer.features.length = getRandom(1, 6);
console.log(offers[0].offer.features);

console.log(offers[0].offer.photos);
offers[0].offer.photos = shuffle(offerData.offer.photos);
console.log(offers[0].offer.photos);


var fragment = document.createDocumentFragment();

offers.forEach(function (i) {
  fragment.appendChild(renderPin(i));
});

mapPins.appendChild(fragment);

var cardElement = cardTemplate.cloneNode(true);

cardElement.querySelector('.popup__title').textContent = offers[0].offer.title;
// cardElement.querySelector('.popup__text--address').textContent = offers[0].offer.address;
cardElement.querySelector('.popup__text--price').textContent = offers[0].offer.price + '₽/ночь';
var apartmentsType;
if (offers[0].offer.type === 'flat') {
  apartmentsType = 'Квартира';
} else if (offers[0].offer.type === 'bungalo') {
  apartmentsType = 'Бунгало';
} else if (offers[0].offer.type === 'house') {
  apartmentsType = 'Дом';
} else if (offers[0].offer.type === 'palace') {
  apartmentsType = 'Дворец';
}
cardElement.querySelector('.popup__type').textContent = apartmentsType;

var guests = ' гостей';
if (offers[0].offer.guests === 1) {
  guests = ' гостя';
}
var rooms = ' комнаты для ';
if (offers[0].offer.rooms === 1) {
  rooms = ' комната для ';
} else if (offers[0].offer.rooms === 5) {
  rooms = ' комнат для ';
}

cardElement.querySelector('.popup__text--capacity').textContent = offers[0].offer.rooms + rooms + offers[0].offer.guests + guests;
cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout;

var cardFeatures = cardElement.querySelector('.popup__features');
var cardFeature = cardElement.querySelector('.popup__feature');
// cardFeatures.insertAdjacentHTML('beforeend', cardFeature);
// cardElement.querySelector('.popup__features').textContent = offers[0].offer.features;
cardElement.querySelector('.popup__description').textContent = offers[0].offer.description;
var cardPhotos = cardElement.querySelector('.popup__photos');
var cardPhoto = cardPhotos.querySelector('.popup__photo');
cardPhoto.setAttribute('src', offerData.offer.photos[0]);

var fragment = document.createDocumentFragment();

for (var i = 1; i < offerData.offer.photos.length; i++) {
  var newPhoto = document.createElement('img');
  newPhoto.className = 'popup__photo';
  newPhoto.setAttribute('width', '45');
  newPhoto.setAttribute('height', '40');
  newPhoto.setAttribute('alt', 'Фотография жилья');
  newPhoto.setAttribute('src', offerData.offer.photos[i]);
  fragment.appendChild(newPhoto);
}

cardPhotos.appendChild(fragment);

cardElement.querySelector('.popup__avatar').setAttribute('src', offers[0].author.avatar);

// mapFilters.insertAdjacentHTML('beforebegin', cardElement);
map.appendChild(cardElement);
