'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  function isEscEvent(evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
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
    if (elements !== null || elements !== undefined) {
      elements.forEach(function (element) {
        element.remove();
      });
    }
  }

  window.util = {
    pressEsc: isEscEvent,
    remove: removeChildren,
    debounce: debounce,
    delete: deleteElements
  };
})();
