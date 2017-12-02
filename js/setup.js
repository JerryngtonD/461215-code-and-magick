// Файл setup.js
'use strict';

var userDialog = document.querySelector('.setup');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

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
    var nameItem = names[Math.floor(Math.random() * names.length)];
    var surnameItem = surnames[Math.floor(Math.random() * surnames.length)];
    alias.push(nameItem, surnameItem);
    shuffle(alias);

    var name = alias.join(' ');
    var coatColor = coatColors[Math.floor(Math.random() * coatColors.length)];
    var eyesColor = eyesColors[Math.floor(Math.random() * eyesColors.length)];

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


var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var openIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');


var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var openPopup = function () {
  setup.classList.remove('hidden');
};

var closePopup = function () {
  setup.classList.add('hidden');
};

var onPopupEscPress = function () {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();

  document.addEventListener('keydown', function () {
    onPopupEscPress();
  });

  setupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', function (event) {
      // enter
      if (event.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  });

});

setupClose.addEventListener('click', function () {
  closePopup();
});

openIcon.addEventListener('focus', function () {
  openIcon.addEventListener('keydown', function (event) {
    // enter
    if (event.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('focus', function () {
    document.addEventListener('keydown', function (event) {
      // enter
      if (event.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });
});

var indexCoatColor = 0;
var changeActiveCoatColor = function () {
  indexCoatColor++;
  return coatColors[indexCoatColor % coatColors.length + 1];
};

var setupWizard = document.querySelector('.setup-wizard');
var setupCoat = setupWizard.querySelector('.wizard-coat');

setupCoat.addEventListener('click', function () {
  var colorClick = changeActiveCoatColor();
  setupCoat.style.fill = colorClick;
});


var indexEyesColor = 0;
var changeActiveEyesColor = function () {
  indexEyesColor++;
  return eyesColors[indexEyesColor % eyesColors.length + 1];
};

var setupEyes = setupWizard.querySelector('.wizard-eyes');
setupEyes.addEventListener('click', function () {
  var colorClick = changeActiveEyesColor();
  setupEyes.style.fill = colorClick;
});


var indexFireballColor = 0;
var changeActiveFireballColor = function () {
  indexFireballColor++;
  return fireballColors[indexFireballColor % fireballColors.length + 1];
};

var setupFireball = document.querySelector('.setup-fireball-wrap');
setupFireball.addEventListener('click', function () {
  var colorClick = changeActiveFireballColor();
  setupFireball.style.background = colorClick;
});


