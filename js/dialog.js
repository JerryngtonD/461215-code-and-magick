'use strict';

(function () {


  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var openIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');


  var setupWizard = document.querySelector('.setup-wizard');
  var setupCoat = setupWizard.querySelector('.wizard-coat');
  var setupEyes = setupWizard.querySelector('.wizard-eyes');


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
          setup.style.top = '80px';
          setup.style.left = '50%';
          closePopup();
        }
      });
    });

  });

  setupClose.addEventListener('click', function () {
    setup.style.top = '80px';
    setup.style.left = '50%';
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
          setup.style.top = '80px';
          setup.style.left = '50%';
          closePopup();
        }
      });
    });

    setupClose.addEventListener('click', function () {
      setup.style.top = '80px';
      setup.style.left = '50%';
      closePopup();
    });
  });


  var indexCoatColor = 0;
  var changeActiveCoatColor = function () {
    indexCoatColor++;
    return window.wizardAttributes.coatColors[indexCoatColor % window.wizardAttributes.coatColors.length + 1];
  };

  setupCoat.addEventListener('click', function () {
    var newColor = changeActiveCoatColor();
    setupCoat.style.fill = newColor;
    window.similarRenderAttrs.coatColor = newColor;
    window.debounce(window.updateWizards());
  });


  var indexEyesColor = 0;
  var changeActiveEyesColor = function () {
    indexEyesColor++;
    return window.wizardAttributes.eyesColors[indexEyesColor % window.wizardAttributes.eyesColors.length + 1];
  };

  setupEyes.addEventListener('click', function () {
    var newColor = changeActiveEyesColor();
    setupEyes.style.fill = newColor;
    window.similarRenderAttrs.eyesColor = newColor;
    window.debounce(window.updateWizards());
  });


  var indexFireballColor = 0;
  var changeActiveFireballColor = function () {
    indexFireballColor++;
    return window.wizardAttributes.fireballColors[indexFireballColor % window.wizardAttributes.fireballColors.length + 1];
  };

  var setupFireball = document.querySelector('.setup-fireball-wrap');
  setupFireball.addEventListener('click', function () {
    var newColor = changeActiveFireballColor();
    setupFireball.style.background = newColor;
    window.similarRenderAttrs.fireballColor = newColor;
  });


  var dialogHandle = setup.querySelector('.setup-user-pic');
  dialogHandle.style.zIndex = 1000;

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      var artifactElements = document.querySelector('.setup-artifacts').querySelectorAll('.setup-artifacts-cell');
      for (var i = 0; i < artifactElements.length; i++) {
        if (!artifactElements[i].hasChildNodes()) {
          artifactElements[i].style.outline = '2px dashed red';
        }
      }
    }
  });

  shopElement.addEventListener('dragend', function () {
    var artifactElements = document.querySelector('.setup-artifacts').querySelectorAll('.setup-artifacts-cell');
    for (var i = 0; i < artifactElements.length; i++) {
      artifactElements[i].style.outline = 'none';
    }
  });

  var artifactsElement = document.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';

    if (!evt.target.hasChildNodes() && evt.target.nodeName !== 'IMG') {
      evt.target.appendChild(draggedItem);
    }

    evt.preventDefault();
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

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


  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

})();
