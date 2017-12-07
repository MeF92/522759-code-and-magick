'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var similarListElement = document.querySelector('.setup-similar-list');
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

  window.setup = {
    getRandomInt: getRandomInt,
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS
  };
  // Реализуем перетаскивание артефактов
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      artifactsElement.style.outline = '2px dashed red';
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    document.addEventListener('dragend', function () {
      artifactsElement.style.outline = '';
    });
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  var onDragDrop = function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  };

  artifactsElement.addEventListener('drop', function (evt) {
    if (evt.target.childElementCount > 0) {
      onDragDrop(evt);
    } else {
      onDragDrop(evt);
      evt.target.appendChild(draggedItem.cloneNode(true));
    }
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    onDragDrop(evt);
  });
})();


