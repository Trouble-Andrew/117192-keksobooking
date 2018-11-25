'use strict';

var AD_QUANTITY = 8;

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

var randomizeData = function (data) {
  var newData = [];
  shuffle(data.name);
  shuffle(data.family);
  shuffle(data.coatColor);
  shuffle(data.eyesColor);
  for (var i = 0; i < WIZARDS_QUANTITY; i++) {
    newWizardsData[i] = {};
    newWizardsData[i].name = data.name[i];
    newWizardsData[i].family = data.family[i];
    newWizardsData[i].coatColor = data.coatColor[i];
    newWizardsData[i].eyesColor = data.eyesColor[i];
  }
  return newData;
};

var wizardsData = {
  name: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  family: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var authorData = {
  'author': {
    'avatar': 'img/avatars/user' + '0' + getRandom(0, AD_QUANTITY + 1) + '.png'
  }
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
  '«x»': getRandom(130, 161),
  '«y»': getRandom(130, 161)
};

function Location() {
  this.ert = getRandom(130, 161),
  this.tyj = getRandom(130, 161)
}

var location = new Location();
console.log(location);

console.log(offerData);

function Author() {
  this.avatar = 'img/avatars/user' + '0' + getRandom(0, AD_QUANTITY + 1) + '.png'
}

var author = new Author();
console.log(author);

shuffle(offerData.offer.title);
shuffle(offerData.offer.type);
shuffle(offerData.offer.checkin);
shuffle(offerData.offer.checkout);
shuffle(offerData.offer.features);
shuffle(offerData.offer.photos);

function Offer() {
  this.title = offerData.offer.title[0],
  this.address = '' + getRandom(1, 600) + ',' + ' ' +getRandom(1, 600),
  this.price = getRandom(1000, 1000001),
  this.type = offerData.offer.type[0],
  this.rooms = getRandom(1, 6),
  this.guests = getRandom(1, 12),
  this.checkin = offerData.offer.checkin[0],
  this.checkout = offerData.offer.checkout[0],
  this.features = offerData.offer.features[0],
  this.description = ' ',
  this.photos = offerData.offer.photos[0]
}
// новый объект
var offer = new Offer();
console.log(offer);

// var obj = Object.assign({}, authorData, offerData);
// console.log(obj);
// console.log(offerData);
