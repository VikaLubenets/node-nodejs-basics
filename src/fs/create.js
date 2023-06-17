import { writeFile } from 'fs';
import { access, constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const file = path.join(__dirname, 'files', 'fresh.txt');

    access(file, constants.F_OK, (err) => {
      if (err) {
        writeFile(file, 'I am fresh and young', (writeErr) => {
          if (writeErr) throw writeErr;
          console.log('File created successfully');
        });
      } else {
        throw new Error('FS operation failed: File already exists');
      }
    });
}

await create();






