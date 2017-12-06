'use strict';

(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var setupElementX = 80;
  var setupElementY = 50;
  var closePopup = function () {
    setupElement.classList.add('hidden');

    setupElement.style.top = setupElementX + 'px';
    setupElement.style.left = setupElementY + '%';
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupCloseElement.addEventListener('click', closePopup);

  setupSubmitElement.addEventListener('click', closePopup);

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  var wizardCoat = document.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = setup.WIZARD_COAT_COLORS[setup.getRandomInt(0, setup.WIZARD_COAT_COLORS.length - 1)];
  });

  var wizardEyes = document.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = setup.WIZARD_EYES_COLORS[setup.getRandomInt(0, setup.WIZARD_EYES_COLORS.length - 1)];
  });

  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = WIZARD_FIREBALL_COLORS[setup.getRandomInt(0, WIZARD_FIREBALL_COLORS.length - 1)];
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
})();
