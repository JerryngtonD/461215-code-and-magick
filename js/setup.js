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


function shuffle(a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var wizards = [];
function getWizardsSet() {
  var wizardsItems = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {};

    var alias = [];
    var nameItem = window.wizardAttributes.names[Math.floor(Math.random() * window.wizardAttributes.names.length)];
    var surnameItem = window.wizardAttributes.surnames[Math.floor(Math.random() * window.wizardAttributes.surnames.length)];
    alias.push(nameItem, surnameItem);
    shuffle(alias);

    var name = alias.join(' ');
    var coatColor = window.wizardAttributes.coatColors[Math.floor(Math.random() * window.wizardAttributes.coatColors.length)];
    var eyesColor = window.wizardAttributes.eyesColors[Math.floor(Math.random() * window.wizardAttributes.eyesColors.length)];

    wizard['name'] = name;
    wizard['coatColor'] = coatColor;
    wizard['eyesColor'] = eyesColor;

    wizardsItems.push(wizard);
  }
  return wizardsItems;
}

wizards = getWizardsSet();

function populate(domElement) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }

  domElement.appendChild(fragment);
}

populate(similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');


