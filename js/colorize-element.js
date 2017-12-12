'use strict';

window.colorizeElement = function (element, setOfColor, drawFunction) {
  var color = setOfColor[Math.floor(Math.random() * setOfColor.length)];

  if (typeof drawFunction === 'function') {
    drawFunction(element, color);
  }
};
