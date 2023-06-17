import fs from 'fs';
import { access, constants } from 'node:fs';
import { rename } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const renameFn = async () => {
    let oldName = path.join(__dirname, 'files', 'wrongFilename.txt');
    let newName = path.join(__dirname, 'files', 'properFilename.md');
    
    access(oldName, constants.F_OK, (err) => {
        if (err) {
            throw new Error('FS operation failed: File wrongFilename.txt does not exist');
        } else {

          access(newName, constants.F_OK, (newNameErr) => {
            if (newNameErr) {
              fs.rename(oldName, newName, (renameErr) => {
                if (renameErr) throw renameErr;
                console.log('Rename is completed successfully!');
              });
            } else {
              throw new Error('FS operation failed: File properFilename.md already exists');
            }
          });

        }
      });

};

await renameFn();