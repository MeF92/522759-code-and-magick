'use strict';

// Работа с окном похожих персонажей
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

  var wizards = [];
  var coatColor;
  var eyesColor;

  var updateWizards = function () {

    var sameCoatAndEyesWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor &&
        it.colorEyes === eyesColor;
    });

    var sameCoatWizards = wizards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizards = wizards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizards;
    filteredWizards = filteredWizards.concat(sameCoatWizards);
    filteredWizards = filteredWizards.concat(sameEyesWizards);
    filteredWizards = filteredWizards.concat(wizards);

    var uniqueWizards =
      filteredWizards.filter(function (it, i) {
        return filteredWizards.indexOf(it) === i;
      });

    window.render(uniqueWizards);
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
      coatColor = randomColor;
    } else {
      eyesColor = randomColor;
    }
    updateWizards();
  };

  var changeElementBackground = function (element, colors, input) {
    var randomColor = colors[getRandomInt(0, colors.length - 1)];
    element.style.backgroundColor = randomColor;
    input.value = randomColor;
  };

  window.colorize.colorizeElement(wizardCoat, WIZARD_COAT_COLORS, fillElement, inputWizardCoat);
  window.colorize.colorizeElement(wizardEyes, WIZARD_EYES_COLORS, fillElement, inputWizardEyes);
  window.colorize.colorizeElement(wizardFireball, WIZARD_FIREBALL_COLORS, changeElementBackground, inputWizardFireball);

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; position: absolute; left: 0; right: 0; margin: 0 auto; text-align: center; background-color: red;';
    node.textContent = errorMessage;
    document.body.insertBefore(node, document.body.firstChild);
  };

  window.backend.load(successHandler, errorHandler);

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


