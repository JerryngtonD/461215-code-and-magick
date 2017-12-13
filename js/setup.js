// Файл setup.js
'use strict';

var userDialog = document.querySelector('.setup');

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


window.colorizeElement(coat, ['red', 'green', 'blue'], fillElement);
window.colorizeElement(eyes, ['navy', 'teal', 'orange'], fillElement);
window.colorizeElement(fireball, ['yellow', 'black', 'aliceblue'], changeElementBackground);


document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

  return wizardElement;
};


var successHandler = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
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


