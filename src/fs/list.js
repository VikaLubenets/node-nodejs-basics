import { access, constants, readdir } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
    const pathFolder = resolve(__dirname, 'files');

    access(pathFolder, constants.F_OK, (err) => {
        if (err) {
          throw new Error('FS operation failed: files folder does not exist');
        } else {
          readdir(pathFolder, { withFileTypes: true }, (readErr, files) => {
            if (readErr) {
              throw new Error(`Error reading directory files: ${readErr}`);
            }
            files.forEach((file) => {
              if (file.isFile()) {
                console.log(file.name);
              }
            });
          });
        }
      });
}
await list();