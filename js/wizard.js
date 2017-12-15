'use strict';

(function () {
  var WIZARD_COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var WIZARD_EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];
  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  window.wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var wizardCoat = document.querySelector('.wizard-coat');
  var inputWizardCoat = document.querySelector('.setup-wizard-appearance input:first-of-type');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var inputWizardEyes = document.querySelector('.setup-wizard-appearance input:last-of-type');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  var inputWizardFireball = document.querySelector('.setup-fireball-wrap input');

  var fillElement = function (element, colors, input, evt) {
    var randomColor = colors[getRandomInt(0, colors.length - 1)];
    element.style.fill = randomColor;
    input.value = randomColor;
    if (evt.target === wizardCoat) {
      window.wizard.onCoatChange(randomColor);
    } else {
      window.wizard.onEyesChange(randomColor);
    }
  };

  var changeElementBackground = function (element, colors, input) {
    var randomColor = colors[getRandomInt(0, colors.length - 1)];
    element.style.backgroundColor = randomColor;
    input.value = randomColor;
  };

  window.colorize.colorizeElement(wizardCoat, WIZARD_COAT_COLORS, fillElement, inputWizardCoat);
  window.colorize.colorizeElement(wizardEyes, WIZARD_EYES_COLORS, fillElement, inputWizardEyes);
  window.colorize.colorizeElement(wizardFireball, WIZARD_FIREBALL_COLORS, changeElementBackground, inputWizardFireball);
})();
