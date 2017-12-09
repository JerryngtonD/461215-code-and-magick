'use strict';

(function () {


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
    return window.wizardAttributes.coatColors[indexCoatColor % window.wizardAttributes.coatColors.length + 1];
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
    return window.wizardAttributes.eyesColors[indexEyesColor % window.wizardAttributes.eyesColors.length + 1];
  };

  var setupEyes = setupWizard.querySelector('.wizard-eyes');
  setupEyes.addEventListener('click', function () {
    var colorClick = changeActiveEyesColor();
    setupEyes.style.fill = colorClick;
  });


  var indexFireballColor = 0;
  var changeActiveFireballColor = function () {
    indexFireballColor++;
    return window.wizardAttributes.fireballColors[indexFireballColor % window.wizardAttributes.fireballColors.length + 1];
  };


  var setupFireball = document.querySelector('.setup-fireball-wrap');
  setupFireball.addEventListener('click', function () {
    var colorClick = changeActiveFireballColor();
    setupFireball.style.background = colorClick;
  });

})();
