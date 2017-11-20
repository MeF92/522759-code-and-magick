// stats.js

'use strict';

window.renderStatistics = function (ctx, names, times) {
  drawingCloud(ctx);
  writingVictoryMessage(ctx);
  definingColumnsHeight(times);
  drawingColumnsWithResults(ctx, names, times);
};

var drawingCloud = function (ctx) {
  ctx.beginPath();
  ctx.moveTo(110, 210);
  ctx.lineTo(150, 290);
  ctx.lineTo(490, 290);
  ctx.lineTo(530, 210);
  ctx.lineTo(530, 60);
  ctx.lineTo(490, 20);
  ctx.lineTo(150, 20);
  ctx.lineTo(110, 60);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fill('evenodd');

  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(140, 280);
  ctx.lineTo(480, 280);
  ctx.lineTo(520, 200);
  ctx.lineTo(520, 50);
  ctx.lineTo(480, 10);
  ctx.lineTo(140, 10);
  ctx.lineTo(100, 50);
  ctx.closePath();
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.stroke();
  ctx.fill();
};

var writingVictoryMessage = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);
};

var getRandom = function getRandom(min, max) {
  return Math.random() * (max - min) + min;
};

var step;
var definingColumnsHeight = function (times) {
  var maxValue = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxValue) {
      maxValue = time;
    }
  }

  var histogramHeight = 150;
  step = histogramHeight / maxValue;
  return step;
};

var drawingColumnsWithResults = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandom(0.1, 1) + ')';
    }
    ctx.fillRect(150 + 90 * i, 250, 40, -(times[i] * step));
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 150 + 90 * i, 270);
    ctx.fillText(times[i].toFixed(), 150 + 90 * i, 240 - (times[i] * step));
  }
};
