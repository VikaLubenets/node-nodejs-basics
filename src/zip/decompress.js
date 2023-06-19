import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
  createReadStream,
  createWriteStream
} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const fileCur = path.join(__dirname, 'files', 'archive.gz');
    const fileTar = path.join(__dirname, 'files', 'fileToCompress.txt');

    const gzip = createGunzip();
    const source = createReadStream(fileCur);
    const destination = createWriteStream(fileTar);

    pipeline(source, gzip, destination, (err) => {
    if (err) {
        console.error('Error has occurred:', err);
    }
    });

};

await decompress();