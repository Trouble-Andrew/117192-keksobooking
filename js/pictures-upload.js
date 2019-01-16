'use strict';


(function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var PICTURE_SIZE = '70';
  var USER_AVATAR_WIDTH = '40';
  var USER_AVATAR_HEIGHT = '44';

  var userAvatarInput = document.querySelector('input[id="avatar"]');
  var userAvatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var userAvatarPreview = document.querySelector('.ad-form-header__preview img');

  var userPicturesInput = document.querySelector('input[id="images"]');
  var userPicturesDropZone = document.querySelector('.ad-form__drop-zone');
  var userPicturesPreviewArea = document.querySelector('.ad-form__photo');
  var userPicturesContainer = document.querySelector('.ad-form__photo-container');

  var allPhotoBlocks = [];

  userPicturesInput.multiple = true;

  userAvatarInput.addEventListener('change', function () {
    displayAvatarPreview(userAvatarInput.files[0]);
  });

  userPicturesInput.addEventListener('change', function () {
    [].forEach.call(userPicturesInput.files, displayPicturesPreview);
  });

  userAvatarDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  });

  userAvatarDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  });

  userAvatarDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    displayAvatarPreview(evt.dataTransfer.files[0]);
    evt.target.style.backgroundColor = '';
  });

  userAvatarDropZone.addEventListener('dragleave', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  userPicturesDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = 'lightgreen';
  });

  userPicturesDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  });

  userPicturesDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    [].forEach.call(evt.dataTransfer.files, displayPicturesPreview);
    evt.target.style.backgroundColor = '';
  });

  userPicturesDropZone.addEventListener('dragleave', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  function displayAvatarPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userAvatarPreview.src = reader.result;
        userAvatarPreview.height = PICTURE_SIZE;
        userAvatarPreview.width = PICTURE_SIZE;
      });
      reader.readAsDataURL(file);
    }
  }

  function displayPicturesPreview(photo) {
    var file = photo;
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (extension) {

      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userPicturesPreviewArea.remove();
        var image = document.createElement('img');
        var photoBlock = document.createElement('div');
        photoBlock.classList.add('ad-form__photo');

        allPhotoBlocks.push(photoBlock);

        image.width = PICTURE_SIZE;
        image.height = PICTURE_SIZE;

        allPhotoBlocks[allPhotoBlocks.length - 1].appendChild(image);
        userPicturesContainer.appendChild(photoBlock);
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function resetPreviews() {
    userAvatarPreview.src = 'img/muffin-grey.svg';
    userAvatarPreview.width = USER_AVATAR_WIDTH;
    userAvatarPreview.height = USER_AVATAR_HEIGHT;

    allPhotoBlocks.forEach(function (element) {
      element.remove();
    });

    userPicturesContainer.appendChild(userPicturesPreviewArea);

    while (userPicturesPreviewArea.children.length > 0) {
      userPicturesPreviewArea.removeChild(userPicturesPreviewArea.lastChild);
    }
  }

  window.uploadedPictures = {
    reset: resetPreviews
  };
})();
