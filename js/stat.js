/* eslint-disable no-trailing-spaces,no-multiple-empty-lines,no-console */
// stats.js

'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);


  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'transparent'

  ctx.fillStyle = '#000';
  ctx.font = '14px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);

  var max = -1;
  var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var histogramWidth = 150;
  var step = histogramWidth / (max - 0);

  ctx.fillText('Список результатов', 120, 60);

  
  function sortKeys(object) {
    var keysSorted = Object.keys(object).sort(function (a, b) {return object[a] - object[b]});
    return keysSorted;
  }

  function getObjNamesAndValues() {
    var NamestoTimes = {};
    for (var i = 0; i < names.length; i++) {
      NamestoTimes['' + names[i]] = times[i];
    }
    return NamestoTimes;
  }

  function getSortedObj(object) {
    var sortedKeys = sortKeys(object);
    var sortedValues = times.sort(function(a, b) {
      return b - a;
    });

    var NamestoTimes = {};
    for (var i = 0; i < sortedKeys.length; i++) {
      NamestoTimes['' + sortedKeys[i]] = sortedValues[i];
    }
    return NamestoTimes;
  }


  var namesAndTimesObj = getSortedObj(getObjNamesAndValues());

  var counter = 0;
  for (var propt in namesAndTimesObj) {
    if (propt == "Вы") {
      ctx.fillStyle = "rgba(255, 0, 0, " + 1 + ")";
    }
    else {
      var opacity = 0;
      while (opacity == 0) {
        opacity = Math.random();
      }
      console.log(opacity)
      ctx.fillStyle = "rgba(0, 0, 255, " + opacity + ")";
    }
    ctx.fillRect(140 + 80 * counter, 250, 40, -namesAndTimesObj[propt] * step);
    ctx.fillStyle = "#000000";
    ctx.fillText(propt, 140 + 80 * counter, 270);
    ctx.fillText(Math.round(namesAndTimesObj[propt]), 140 + 80 * counter, 240 - namesAndTimesObj[propt] * step);

    counter++;


  }

};


