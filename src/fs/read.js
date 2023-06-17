import fs from 'fs';
import { access, constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const pathFile = path.resolve(__dirname, 'files', 'fileToRead.txt');

  access(pathFile, constants.F_OK, (err) => {
    if (err) {
      throw new Error('FS operation failed: file fileToRead.txt does not exist');
    } else {
      fs.readFile(pathFile, { withFileTypes: true }, (readErr, content) => {
        if (readErr) {
          throw new Error(`Error reading file: ${readErr}`);
        }
        console.log(content.toString());
      });
    }
  });
};

await read();