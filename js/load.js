'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.form.reset();
      form.appendChild(successMessageTemplate);
      var successPopup = document.querySelector('.success');
      console.log(successPopup);

      // successPopup.addEventListener('click', function (evt) {
      //   window.popup.close(evt, successPopup);
      // });

      successPopup.addEventListener('click', window.popup.close(evt, successPopup));

    });
    evt.preventDefault();
  });

  var dataArray = [];

  function successHandler(ads) {
    ads.forEach(function (ad) {
      dataArray.push(ad);
    });
    return dataArray;
  }

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');


  window.load = {
    data: dataArray
  };
})();
