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
    window.util.pressEsc(evt, closeSuccessMessage);
  }

  function messageErrorClickHandler(evt) {
    window.util.pressEsc(evt, closeErrorMessage);
  }

  function successSendMessage() {
    form.reset();
    window.filter.toggle(true);
    window.filter.reset();
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

})();
