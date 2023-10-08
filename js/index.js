(() => {
  const canvas = document.querySelector('canvas');
  const degProperty = document.getElementById('deg');
  const radProperty = document.getElementById('rad');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.width;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX * .8;
  const step = .25;

  const setup = () => {
    // Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Negative x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(0, centerY);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Positive x-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Negative y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, canvas.height);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Positive y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, 0);
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 15]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    // Origin
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * .035, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  const drawRadius = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
  }

  const drawOpposite = (radians) => {
    ctx.beginPath();
    ctx.moveTo(
      centerX + radius * Math.cos(radians),
      centerY - radius * Math.sin(radians)
    );
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();
  }

  const drawAdjacent = (radians) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(radians),
      centerY
    );
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
  }

  const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  const degreesToRadians = (degrees) => degrees * Math.PI / 180;
  const radiansToDegrees = (radians) => radians * 180 / Math.PI;

  const update = (angle) => {
    const radians = degreesToRadians(angle);
    clear();
    setup();

    if (angle >= 360) angle = 0

    drawRadius(radians);
    drawOpposite(radians);
    drawAdjacent(radians);

    degProperty.innerHTML = angle.toFixed(0);
    radProperty.innerHTML = radians.toFixed(2);

    window.requestAnimationFrame(() => update(angle + step));
  }

  setup();
  update(0);
})();