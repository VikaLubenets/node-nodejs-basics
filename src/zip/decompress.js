import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
  createReadStream,
  createWriteStream,
  unlink
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const fileCur = join(__dirname, 'files', 'archive.gz');
    const fileTar = join(__dirname, 'files', 'fileToCompress.txt');

    const gzip = createGunzip();
    const source = createReadStream(fileCur);
    const destination = createWriteStream(fileTar);

    pipeline(source, gzip, destination, (err) => {
      if (err) {
          console.error('Error has occurred:', err);
      }
      unlink(fileCur, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting the file:', unlinkErr);
        }
      });
    });

};

await decompress();