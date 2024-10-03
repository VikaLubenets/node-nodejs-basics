import { access, constants, rename } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const renameFn = async () => {
    let oldName = join(__dirname, 'files', 'wrongFilename.txt');
    let newName = join(__dirname, 'files', 'properFilename.md');
    
    access(oldName, constants.F_OK, (err) => {
        if (err) {
            throw new Error('FS operation failed: File wrongFilename.txt does not exist');
        } else {
          access(newName, constants.F_OK, (newNameErr) => {
            if (newNameErr) {
              rename(oldName, newName, (renameErr) => {
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