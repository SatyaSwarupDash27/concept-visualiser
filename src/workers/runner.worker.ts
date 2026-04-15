import { algorithmMap } from './algorithmMap';
import type { WorkerInbound } from './workerBridge';

let paused = false;
let generator: Generator<any> | null = null;
let currentStep = 0;

self.onmessage = ({ data }: MessageEvent<WorkerInbound>) => {
  switch (data.type) {
    case 'START': {
      const algo = algorithmMap[data.algorithmId];
      if (!algo) {
        self.postMessage({ type: 'ERROR', message: `Algorithm not found: ${data.algorithmId}` });
        return;
      }
      generator = algo(data.input);
      paused = false;
      currentStep = 0;
      streamChunks();
      break;
    }
    case 'PAUSE':
      paused = true;
      break;
    case 'RESUME':
      paused = false;
      streamChunks();
      break;
    case 'REQUEST_CHUNK':
      streamFrom(data.fromStep, data.count);
      break;
  }
};

function streamChunks(chunkSize = 50): void {
  if (!generator || paused) return;

  const batch: unknown[] = [];
  const startStep = currentStep;

  for (let i = 0; i < chunkSize; i++) {
    const { value, done } = generator.next();

    if (done) {
      if (batch.length > 0) {
        self.postMessage({ type: 'CHUNK', startStep, snapshots: batch });
      }
      self.postMessage({ type: 'DONE', totalSteps: currentStep });
      return;
    }

    batch.push(value);
    currentStep++;
  }

  self.postMessage({ type: 'CHUNK', startStep, snapshots: batch });
  self.postMessage({ type: 'PROGRESS', computed: currentStep });

  setTimeout(() => streamChunks(chunkSize), 0);
}

function streamFrom(fromStep: number, count: number): void {
  if (!generator) return;

  const batch: unknown[] = [];
  let step = 0;

  while (step < fromStep) {
    const { done } = generator.next();
    if (done) return;
    step++;
  }

  for (let i = 0; i < count; i++) {
    const { value, done } = generator.next();
    if (done) break;
    batch.push(value);
  }

  self.postMessage({ type: 'CHUNK', startStep: fromStep, snapshots: batch });
}
