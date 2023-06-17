import fs from 'fs';
import { access, constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {

    const pathFolder = path.resolve(__dirname, 'files');

    access(pathFolder, constants.F_OK, (err) => {
        if (err) {
          throw new Error('FS operation failed: files folder does not exist');
        } else {
          fs.readdir(pathFolder, { withFileTypes: true }, (readErr, files) => {
            if (readErr) {
              throw new Error(`Error reading directory: ${readErr}`);
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