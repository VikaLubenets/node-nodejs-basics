import { access, constants, unlink } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
    const file = join(__dirname, 'files', 'fileToRemove.txt');

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