'use strict';

// Работа с окном похожих персонажей
(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    var numIndex;
    var wizardsArr = wizards.slice();
    for (var i = 0; i < 4; i++) {
      numIndex = getRandomInt(0, wizardsArr.length - 1);
      fragment.appendChild(renderWizard(wizardsArr[numIndex]));
      wizardsArr.splice(numIndex, 1);
    }
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; position: absolute; left: 0; right: 0; margin: 0 auto; text-align: center; background-color: red;';
    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);
  };

  window.backend.load(successHandler, errorHandler);

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


