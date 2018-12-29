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

  function successSendMessage() {
    window.form.reset();
    form.appendChild(successSendMessageTemplate);
    var successPopup = document.querySelector('.success');
    form.appendChild(successSendMessageTemplate);
    document.addEventListener('keydown', function (evt) {
      window.popup.close(evt, successPopup);
    });
    successPopup.addEventListener('click', function () {
      successPopup.remove();
    });
  }
  function errorSendMessage() {
    form.appendChild(errorSendMessageTemplate);
    var errorPopup = document.querySelector('.error');
    form.appendChild(errorSendMessageTemplate);
    document.addEventListener('keydown', function (evt) {
      window.popup.close(evt, errorPopup);
    });
    errorPopup.addEventListener('click', function () {
      errorPopup.remove();
    });
  }

  var dataArray = [];

  function successHandler(ads) {
    ads.forEach(function (ad) {
      dataArray.push(ad);
    });
    return dataArray;
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635; color: #ffffff;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.load = {
    data: dataArray
  };
})();
