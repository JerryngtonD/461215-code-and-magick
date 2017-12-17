// Файл setup.js
'use strict';

var setupWizard = document.querySelector('.setup-wizard');
var coat = setupWizard.querySelector('.wizard-coat');
var eyes = setupWizard.querySelector('.wizard-eyes');

var fireball = document.querySelector('.setup-fireball-wrap');

var fillElement = function (element, color) {
  element.style.fill = color;
};

var changeElementBackground = function (element, color) {
  element.style.background = color;
};


window.wizardAttributes = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],

  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]

};

window.colorizeElement(coat, window.wizardAttributes.coatColors, fillElement);
window.colorizeElement(eyes, window.wizardAttributes.eyesColors, fillElement);
window.colorizeElement(fireball, window.wizardAttributes.fireballColors, changeElementBackground);


document.querySelector('.setup-similar').classList.remove('hidden');


window.wizards = [];

window.similarRenderAttrs = {
  coatColor: coat.style.fill,
  eyesColor: eyes.style.fill,
  fireballColor: '',
};

var successHandler = function (data) {
  window.wizards = data;
  window.debounce(window.updateWizards(window.wizards));
};

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style.display = 'flex';
  node.style.justifyContent = 'space-around';
  node.style.backgroundColor = 'white';
  var firstInnerContent = document.createElement('div');
  firstInnerContent.innerHTML = 'Ошибка:';
  firstInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
  firstInnerContent.style.fontSize = '30px';
  var secondInnerContent = document.createElement('div');
  node.appendChild(firstInnerContent);
  node.appendChild(secondInnerContent);
  secondInnerContent.style = 'z-index: 100; text-align: center; background-color: red;';
  secondInnerContent.style.fontSize = '30px';

  secondInnerContent.innerHTML = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.backend.load(successHandler, errorHandler);


