'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [
  {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_NAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_NAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_NAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)]
  },
  {
    name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_NAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomInt(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomInt(0, WIZARD_EYES_COLORS.length - 1)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var insertFragment = function (fragment) {
  fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(insertFragment());


