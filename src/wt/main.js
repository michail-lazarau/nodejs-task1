import { Worker } from 'node:worker_threads';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cores = os.availableParallelism();
  const promises = [];

  for (let i = 0; i < cores; i++) {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
      workerData: 10 + i
    });

    const promise = new Promise((resolve) => {
      worker.on('message', (msg) => {
        const output = msg.status === 'success'
        ? { status: 'resolved', data: msg.result }
        : { status: 'error', data: null }
        resolve(output);
      });
    });

    promises.push(promise);
  }

  const results = await Promise.all(promises);
  console.log(results);
}

await performCalculations();