'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  }
  function isEnterEvent(evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
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
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function removeChildren(elem) {
    while (elem.lastChild) {
      elem.innerHTML = null;
    }
  }
  function debounce(callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  }

  function deleteElements(selector) {
    var elements = document.querySelectorAll(selector);
    if (elements !== null || elements) {
      elements.forEach(function (element) {
        element.remove();
      });
    }
  }

  window.util = {
    pressEsc: isEscEvent,
    pressEnter: isEnterEvent,
    shuffle: shuffle,
    random: getRandom,
    remove: removeChildren,
    debounce: debounce,
    delete: deleteElements
  };
})();
