import { createReadStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const file = resolve(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(file);

    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
};

await read();