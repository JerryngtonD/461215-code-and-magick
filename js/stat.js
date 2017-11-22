/* eslint-disable no-trailing-spaces,no-multiple-empty-lines,no-console */
// stats.js
'use strict';

window.renderStatistics = function (ctx, names, times) {

  var defaultIndent = 0;
  var histogramWidth = 150;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);


  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent';

  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';

  var initializeXtext = 120;
  var initializeYtext = 40;
  ctx.fillText('Ура вы победили!', initializeXtext, initializeYtext);

  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  
  var step = histogramWidth / (max - defaultIndent);

  var initializeYresult = 60;
  ctx.fillText('Список результатов', initializeXtext, initializeYresult);


  function sortKeys(object) {
    var keysSorted = Object.keys(object).sort(function (a, b) {
      return object[a] - object[b];
    });
    return keysSorted;
  }

  function getObjNamesAndValues() {
    var NamestoTimes = {};
    for (var index = 0; index < names.length; index++) {
      NamestoTimes['' + names[index]] = times[index];
    }
    return NamestoTimes;
  }

  function getSortedObj(object) {
    var sortedKeys = sortKeys(object);
    var sortedValues = times.sort(function (a, b) {
      return b - a;
    });

    var NamestoTimes = {};
    for (var index = 0; index < sortedKeys.length; index++) {
      NamestoTimes['' + sortedKeys[index]] = sortedValues[index];
    }
    return NamestoTimes;
  }


  var namesAndTimesObj = getSortedObj(getObjNamesAndValues());

  var counter = 0;
  for (var propt in namesAndTimesObj) {
    if (propt === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, ' + 1 + ')';
    } else {
      var opacity = 0;
      while (opacity === 0) {
        opacity = Math.random();
      }
      console.log(opacity);
      ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity + ')';
    }
    ctx.fillRect(140 + 80 * counter, 250, 40, -namesAndTimesObj[propt] * step);
    ctx.fillStyle = '#000000';
    ctx.fillText(propt, 140 + 80 * counter, 270);
    ctx.fillText(Math.round(namesAndTimesObj[propt]), 140 + 80 * counter, 240 - namesAndTimesObj[propt] * step);

    counter++;
  }

};


