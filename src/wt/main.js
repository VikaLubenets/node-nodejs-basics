import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const quantatyCPU = cpus().length;
    let n = 10;
    const results = new Array(quantatyCPU).fill(null);
    const workers = [];

    for (let i = 0; i < quantatyCPU; i++) {
        workers.push(
            new Promise((resolve, reject) => {
                const worker = new Worker(join(__dirname, 'worker.js'), { workerData: { n } });
                n++;

                worker.on('message', (result) => {
                    results[i] = { status: 'resolved', data: result };
                    resolve();
                });

                worker.on('error', (err) => {
                    results[i] = { status: 'error', data: null };
                    reject(err);
                });
            })
        );
    }

    await Promise.all(workers);

    console.log(results);
};

await performCalculations();
