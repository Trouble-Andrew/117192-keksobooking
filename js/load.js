'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), successMessage);
  });

  function successMessage() {
    window.form.reset();
    form.appendChild(successMessageTemplate);
    var successPopup = document.querySelector('.success');
    form.appendChild(successMessageTemplate);
    document.addEventListener('keydown', function (evt) {
      window.popup.close(evt, successPopup);
    });
    successPopup.addEventListener('click', function () {
      successPopup.remove();
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

  };

  window.backend.load(successHandler, errorHandler);

  window.load = {
    data: dataArray
  };
})();
