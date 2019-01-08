'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var successSendMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorSendMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successSendMessage, errorSendMessage);
  });

  function closeSuccessMessage() {
    document.removeEventListener('keydown', messageSuccessClickHandler);
    var successMessage = document.querySelector('.success');
    successMessage.remove();
  }
  function closeErrorMessage() {
    document.removeEventListener('keydown', messageErrorClickHandler);
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
  }

  function messageSuccessClickHandler(evt) {
    window.util.isEscEvent(evt, closeSuccessMessage);
  }

  function messageErrorClickHandler(evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  }

  function successSendMessage() {
    form.reset();
    window.pinSlider.pinPosition();
    window.map.deactivation();
    form.appendChild(successSendMessageTemplate);
    var successPopup = document.querySelector('.success');
    successPopup.addEventListener('click', closeSuccessMessage);
    document.addEventListener('keydown', messageSuccessClickHandler);
  }

  function errorSendMessage() {
    form.appendChild(errorSendMessageTemplate);
    var errorPopup = document.querySelector('.error');
    form.appendChild(errorSendMessageTemplate);
    errorPopup.addEventListener('click', closeErrorMessage);
    document.addEventListener('keydown', messageErrorClickHandler);
  }

  var dataArray = [];

  function successHandler(ads) {
    dataArray = ads.slice();
    return dataArray;
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635; color: #ffffff;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend.load(successHandler, errorHandler);

  window.load = {
    getData: function () {
      return dataArray;
    }
  };
})();
