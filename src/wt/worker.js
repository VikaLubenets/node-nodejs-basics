import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (n) => {
    if (isMainThread) {
        const worker = new Worker(__filename, { workerData: n });
        worker.on('message', (result) => {
          console.log('Result received:', result); 
        });
    } else {
        const result = nthFibonacci(workerData);
        parentPort.postMessage(result);
    }
};


const n = 7;
sendResult(n);