'use strict';

(function () {
  var colorizeElement = function (element, colors, action) {
    element.addEventListener('click', function () {
      action(element, colors);
    });
  };
  window.colorize = {
    colorizeElement: colorizeElement
  };
})();
