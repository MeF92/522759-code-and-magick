'use strict';

(function () {
  var colorizeElement = function (element, color, action) {
    element.addEventListener('click', function () {
      action(element, color);
    });
  };
  window.colorize = {
    colorizeElement: colorizeElement
  };
})();
