import { writeFile, access,  constants} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const file = join(__dirname, 'files', 'fresh.txt');

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






