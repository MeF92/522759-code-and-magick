'use strict';

window.renderStatistics = function (ctx, names, times) {
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

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  var maxValue = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > maxValue) {
      maxValue = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (maxValue - 0);
  var getRandom = function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  };

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
      ctx.fillRect(150, 250, 40, -(times[i] * step));
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], 150, 270);
      ctx.fillText(times[i].toFixed(), 150, 90);
    } else if (names[i] !== 'Вы') {
      for (var j = 1; j < names.length; j++) {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandom(0.1, 1) + ')';
        ctx.fillRect(150 + 90 * j, 250, 40, -(times[j] * step));
        ctx.fillStyle = '#000';
        ctx.fillText(names[j], 150 + 90 * j, 270);
        ctx.fillText(times[j].toFixed(), 150 + 90 * j, 90);
      }
    }
  }
};
