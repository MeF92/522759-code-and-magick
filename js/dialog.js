'use strict';

// Работа с окном персонажа
(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_ELEMENT_X = 80;
  var SETUP_ELEMENT_Y = 50;

  var setup = window.setup;
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

  // setupSubmitElement.addEventListener('click', closePopup);

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  var wizardCoat = document.querySelector('.wizard-coat');
  var inputWizardCoat = document.querySelector('.setup-wizard-appearance input:first-of-type');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var inputWizardEyes = document.querySelector('.setup-wizard-appearance input:last-of-type');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputWizardFireball = document.querySelector('.setup-fireball-wrap input');

  var fillElement = function (element, colors, input) {
    var randomColor = colors[setup.getRandomInt(0, colors.length - 1)];
    element.style.fill = randomColor;
    input.value = randomColor;
  };

  var changeElementBackground = function (element, colors, input) {
    var randomColor = colors[setup.getRandomInt(0, colors.length - 1)];
    element.style.backgroundColor = randomColor;
    input.value = randomColor;
  };

  window.colorize.colorizeElement(wizardCoat, setup.WIZARD_COAT_COLORS, fillElement, inputWizardCoat);
  window.colorize.colorizeElement(wizardEyes, setup.WIZARD_EYES_COLORS, fillElement, inputWizardEyes);
  window.colorize.colorizeElement(wizardFireball, WIZARD_FIREBALL_COLORS, changeElementBackground, inputWizardFireball);
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
