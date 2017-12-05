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

  var closePopup = function () {
    setupElement.classList.add('hidden');
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
})();
