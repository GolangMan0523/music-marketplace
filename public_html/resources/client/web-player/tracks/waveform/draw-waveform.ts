export function drawWaveform(
  waveData: number[][],
  canvas: HTMLCanvasElement,
  color: string,
  barWidth: number,
  barSpacing: number,
  audioUrl: string,
  analyzerData: {
    analyzer: AnalyserNode | null;
    bufferLength: number;
    dataArray: Uint8Array;
    audioCtx: AudioContext | null;
  } | null,
) {
  const context = canvas.getContext('2d');
  if (!context) return;

  let source: AudioBufferSourceNode | null = null;
  let animationFrame: number | null = null;

  if (analyzerData && analyzerData.audioCtx) {
    source = analyzerData.audioCtx.createBufferSource() || null;
  }
  function draw() {
    if (!context) return;
    if (analyzerData) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color;
      context.globalAlpha = 1;

      waveData.forEach((lineData, index) => {
        const x = lineData[0] + (barWidth + barSpacing) * index;
        const barHeight = (analyzerData.dataArray[index] / 256) * canvas.height;
        context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      });

      animationFrame = requestAnimationFrame(draw);
    }
  }

  function updateAnimationTime() {
    if (analyzerData && analyzerData.audioCtx) {
      const currentTime = analyzerData.audioCtx?.currentTime;
      const animationTime =
        (currentTime % source!.buffer!.duration) / source!.buffer!.duration;
      const animationFrameTime = animationTime * 1000; // Convert to milliseconds
      animationFrame = requestAnimationFrame(draw);
      setTimeout(
        () => cancelAnimationFrame(animationFrame!),
        animationFrameTime,
      );
    }
  }

  // Start the audio when the component is mounted
  // Draw and update animation time
  draw();
  analyzerData?.audioCtx?.addEventListener('timeupdate', updateAnimationTime);

  return {};
}
