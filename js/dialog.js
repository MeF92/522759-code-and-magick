'use strict';

// Работа с окном персонажа
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_ELEMENT_X = 80;
  var SETUP_ELEMENT_Y = 50;

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var setupUserNameElement = setupElement.querySelector('.setup-user-name');
  var setupSubmitElement = document.querySelector('.setup-submit');
  setupElement.querySelector('.setup-similar').classList.remove('hidden');

  var openPopup = function () {
    setupElement.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserNameElement) {
        closePopup();
      } else if (evt.keyCode === ENTER_KEYCODE && evt.target === setupCloseElement) {
        closePopup();
      } else if (evt.keyCode === ENTER_KEYCODE && evt.target === setupSubmitElement) {
        closePopup();
      }
    });
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');

    setupElement.style.top = SETUP_ELEMENT_X + 'px';
    setupElement.style.left = SETUP_ELEMENT_Y + '%';
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupCloseElement.addEventListener('click', closePopup);

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
  // Реализуем перетаскивание диалогового окна
  var dialogHandleElement = setupElement.querySelector('.setup-user-pic');
  dialogHandleElement.style.zIndex = 10;
  dialogHandleElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Отправляем данные о персонаже на сервер
  var formElement = setupElement.querySelector('.setup-wizard-form');
  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), closePopup);
    evt.preventDefault();
  });
})();
