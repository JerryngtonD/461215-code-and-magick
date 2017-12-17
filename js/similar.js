'use strict';

(function () {

  window.getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.similarRenderAttrs.coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === window.similarRenderAttrs.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  window.updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = window.getRank(right) - window.getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.wizards.indexOf(left) - window.wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

})();
