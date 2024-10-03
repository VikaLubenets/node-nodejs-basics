import { access, constants, readFile } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const pathFile = resolve(__dirname, 'files', 'fileToRead.txt');

  access(pathFile, constants.F_OK, (err) => {
    if (err) {
      throw new Error('FS operation failed: file fileToRead.txt does not exist');
    } else {
      readFile(pathFile, { withFileTypes: true }, (readErr, content) => {
        if (readErr) {
          throw new Error(`Error reading file: ${readErr}`);
        }
        console.log(content.toString());
      });
    }
  });
};

await read();