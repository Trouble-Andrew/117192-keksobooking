'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  function request(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var HttpErrors = {
      400: 'Неверный запрос.',
      401: 'Требуется авторизация.',
      404: 'Данные не найдены.',
      418: 'I\'m a teapot.',
      500: 'Ошибка сервера.'
    };

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(HttpErrors[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания ответа. Проверьте интеренет соединение.');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  function save(data, onLoad, onError) {
    var xhr = request(onLoad, onError);
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = request(onLoad, onError);
    xhr.responseType = 'json';

    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  window.backend = {
    load: load,
    save: save
  };
})();
