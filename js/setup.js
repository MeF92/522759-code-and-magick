'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var userDialogElement = document.querySelector('.setup');
  userDialogElement.classList.remove('hidden');
  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = userDialogElement.querySelector('.setup-similar-list');

  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var createWizards = function () {
    var wizards = [];
    for (var i = 0; i < 4; i++) {
      wizards[i] = {
        name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_NAMES.length - 1)],
        coatColor: WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)],
        eyesColor: WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)]
      };
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var insertFragment = function (wizards) {
    var fragmentElement = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragmentElement.appendChild(renderWizard(wizards[i]));
    }
    return fragmentElement;
  };

  similarListElement.appendChild(insertFragment(createWizards()));
})();


