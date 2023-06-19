import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
  createReadStream,
  createWriteStream
} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const fileCur = path.join(__dirname, 'files', 'fileToCompress.txt');
    const fileTar = path.join(__dirname, 'files', 'archive.gz');

    const gzip = createGzip();
    const source = createReadStream(fileCur);
    const destination = createWriteStream(fileTar);

    pipeline(source, gzip, destination, (err) => {
    if (err) {
        console.error('An error occurred:', err);
        process.exitCode = 1;
    }
    });

};

await compress();