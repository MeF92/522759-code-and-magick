'use strict';

(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.common.setup.querySelector('.setup-close');
  var setupUserName = window.common.setup.querySelector('.setup-user-name');
  var setupSubmit = document.querySelector('.setup-submit');
  window.common.setup.querySelector('.setup-similar').classList.remove('hidden');

  var openPopup = function () {
    window.common.setup.classList.remove('hidden');

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
        closePopup();
      } else if (evt.keyCode === ENTER_KEYCODE && evt.target === setupClose) {
        closePopup();
      } else if (evt.keyCode === ENTER_KEYCODE && evt.target === setupSubmit) {
        closePopup();
      }
    });
  };

  var closePopup = function () {
    window.common.setup.classList.add('hidden');
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupClose.addEventListener('click', closePopup);

  setupSubmit.addEventListener('click', closePopup);

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  var wizardCoat = document.querySelector('.wizard-coat');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.common.WIZARD_COAT_COLORS[window.common.getRandomInt(0, window.common.WIZARD_COAT_COLORS.length - 1)];
  });

  var wizardEyes = document.querySelector('.wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.common.WIZARD_EYES_COLORS[window.common.getRandomInt(0, window.common.WIZARD_EYES_COLORS.length - 1)];
  });

  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = WIZARD_FIREBALL_COLORS[window.common.getRandomInt(0, WIZARD_FIREBALL_COLORS.length - 1)];
  });
})();
