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

  var max = -1;

  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  ctx.fillRect(150, 170, 40, times[0] * step);
  ctx.fillRect(240, 170, 40, times[1] * step);
  ctx.fillRect(330, 170, 40, times[2] * step);
  ctx.fillRect(420, 170, 40, times[3] * step);
};
