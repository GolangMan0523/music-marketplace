export function drawAnimation(
  waveData: number[][],
  canvas: HTMLCanvasElement,
  color: string,
  barWidth: number,
  barSpacing: number,
) {
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color;

  waveData.forEach((lineData, index) => {
    const x = lineData[0] + (barWidth + barSpacing) * index;
    const barHeight = lineData[1];

    // Calculate coordinates for rounded top
    const barTopX = x + barWidth / 2;
    const barTopY = canvas.height - barHeight;

    // Draw the bar with a rounded top
    context.beginPath();
    context.moveTo(x, canvas.height);
    context.lineTo(x, barTopY);
    context.arc(barTopX, barTopY, barWidth / 2, Math.PI, 0, false);
    context.lineTo(x + barWidth, canvas.height);
    context.closePath();
    context.fill();
  });
}
