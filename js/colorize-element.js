'use strict';

(function () {
  var colorizeElement = function (element, colors, action, input) {
    element.addEventListener('click', function (evt) {
      action(element, colors, input, evt);
    });
  };
  window.colorize = {
    colorizeElement: colorizeElement
  };
})();
