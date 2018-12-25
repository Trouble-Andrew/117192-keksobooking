'use strict';

(function () {
  var AD_QUANTITY = 8;
  var ROOMS_RANDOM = 5;
  var MIN_PRICE_RANDOM = 1000;
  var MAX_PRICE_RANDOM = 1000001;
  var ADDRESS_RANDOM = 601;
  var POSITION_Y1_RANDOM = 130;
  var POSITION_Y2_RANDOM = 631;

  var mapPins = document.querySelector('.map__pins');
  var mapPinsSize = mapPins.offsetWidth;

  var authorData = {
    'author': {
      'avatar': 'img/avatars/user0' + '.png'
    },
    'userAvatarNum': [1, 2, 3, 4, 5, 6, 7, 8]
  };

  var offerData = {
    'offer': {
      'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
      'address': '' + window.util.getRandom(1, ADDRESS_RANDOM) + ',' + ' ' + window.util.getRandom(1, ADDRESS_RANDOM),
      'price': window.util.getRandom(MIN_PRICE_RANDOM, MAX_PRICE_RANDOM),
      'type': ['palace', 'flat', 'house', 'bungalo'],
      'rooms': window.util.getRandom(1, ROOMS_RANDOM),
      'guests': window.util.getRandom(1, ROOMS_RANDOM * 2),
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
    advertise.location.x = window.util.getRandom(0, mapPinsSize);
    advertise.location.y = window.util.getRandom(POSITION_Y1_RANDOM, POSITION_Y2_RANDOM);
    advertise.offer.title = offerData.offer.title[i];
    advertise.offer.address = advertise.location.x + ', ' + advertise.location.y;
    advertise.offer.price = window.util.getRandom(MIN_PRICE_RANDOM, MAX_PRICE_RANDOM);
    advertise.offer.type = offerData.offer.type[window.util.getRandom(0, offerData.offer.type.length)];
    advertise.offer.rooms = window.util.getRandom(1, ROOMS_RANDOM);
    advertise.offer.guests = window.util.getRandom(1, ROOMS_RANDOM * 2);
    advertise.offer.checkin = offerData.offer.checkin[window.util.getRandom(0, offerData.offer.checkin.length)];
    advertise.offer.checkout = offerData.offer.checkout[window.util.getRandom(0, offerData.offer.checkout.length)];
    advertise.offer.features = offerData.offer.features;
    advertise.offer.description = ' ';
    advertise.offer.photos = offerData.offer.photos;

    return advertise;
  }

  function generateAds() {
    var advertises = [];
    for (var i = 0; i < AD_QUANTITY; i++) {
      advertises[i] = generateAd(i);
      advertises[i].offer.photos = window.util.shuffle(advertises[i].offer.photos);
      advertises[i].offer.features = window.util.shuffle(advertises[i].offer.features).slice(0, window.util.getRandom(1, advertises[i].offer.features.length));
    }
    return advertises;
  }

  window.data = {
    generateAds: generateAds
  };

})();
