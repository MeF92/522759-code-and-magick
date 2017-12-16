'use strict';

// Работа с окном похожих персонажей
(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

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


