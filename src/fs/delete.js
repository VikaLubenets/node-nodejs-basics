import fs from 'fs';
import { access, constants } from 'node:fs';
import { unlink } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const file = path.join(__dirname, 'files', 'fileToRemove.txt');

    access(file, constants.F_OK, (err) => {
      if (err) {
        throw new Error('FS operation failed: File does not exist');
      } else {
        unlink(file, (err) => {
            if (err) throw err;
            console.log('fileToRemove.txt was deleted');
          });
      }
    });
}

await remove();