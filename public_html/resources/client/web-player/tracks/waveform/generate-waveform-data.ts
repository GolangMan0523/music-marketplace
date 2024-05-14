export const WAVE_WIDTH = 1365;
export const WAVE_HEIGHT = 45;
const BAR_WIDTH = 3;
const BAR_GAP: number = 0.5;

export function generateWaveformData(file: File): Promise<number[][] | null> {
  const audioContext = new window.AudioContext();
  return new Promise((resolve, abort) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      abort();
      return;
    }
    canvas.width = WAVE_WIDTH;
    canvas.height = WAVE_HEIGHT;

    // read file buffer
    const reader = new FileReader();
    reader.onload = e => {
      const buffer = e.target?.result;
      if (!buffer) {
        abort();
      } else {
        audioContext.decodeAudioData(
          buffer as ArrayBuffer,
          buffer => {
            const waveData = extractBuffer(buffer, context);
            resolve(waveData);
          },
          () => resolve(null),
        );
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function extractBuffer(buffer: AudioBuffer, context: CanvasRenderingContext2D) {
  const waveData: number[][] = [];
  const channelData = buffer.getChannelData(0);
  const sections = WAVE_WIDTH;
  const len = Math.floor(channelData.length / sections);
  const maxHeight = WAVE_HEIGHT;
  const vals = [];
  for (let i = 0; i < sections; i += BAR_WIDTH) {
    vals.push(bufferMeasure(i * len, len, channelData) * 10000);
  }

  for (let j = 0; j < sections; j += BAR_WIDTH) {
    const scale = maxHeight / Math.max(...vals);
    let val = bufferMeasure(j * len, len, channelData) * 10000;
    val *= scale;
    val += 1;
    waveData.push(getBarData(j, val));
  }

  // clear canvas for redrawing
  context.clearRect(0, 0, WAVE_WIDTH, WAVE_HEIGHT);
  return waveData;
}

function bufferMeasure(position: number, length: number, data: Float32Array) {
  let sum = 0.0;
  for (let i = position; i <= position + length - 1; i++) {
    sum += Math.pow(data[i], 2);
  }
  return Math.sqrt(sum / data.length);
}

function getBarData(i: number, h: number) {
  let w = BAR_WIDTH;
  if (BAR_GAP !== 0) {
    w *= Math.abs(1 - BAR_GAP);
  }
  const x = i + w / 2,
    y = WAVE_HEIGHT - h;

  return [x, y, w, h];
}
