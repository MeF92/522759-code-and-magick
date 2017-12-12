'use strict';

(function () {
  var colorizeElement = function (element, colors, action, input) {
    element.addEventListener('click', function () {
      action(element, colors, input);
    });
  };
  window.colorize = {
    colorizeElement: colorizeElement
  };
})();
