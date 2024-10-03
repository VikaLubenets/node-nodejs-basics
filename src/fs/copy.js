import { access, constants, mkdir, readdir, copyFile } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const pathFolderCurr = resolve(__dirname, 'files');
    const pathFolderTarget = resolve(__dirname, 'files-copy');

    access(pathFolderCurr, constants.F_OK, (err) => {
        if (err){
            throw new Error('FS operation failed: folder files does not exist');
        } else {
            access(pathFolderTarget, constants.F_OK, (err) => {
                if (err) {
                    mkdir(pathFolderTarget, err => {
                        if (err) throw err;
                        console.log('Folder created successfully');
                    });
                    
                    readdir(pathFolderCurr, { withFileTypes: true }, (err, files) => {
                        if (err) {
                        return console.log(`Error reading folder files: ${err}`);
                        }
                        files.forEach((file) => {
                        const pathSource = join(pathFolderCurr, file.name);
                        const pathTarget = join(pathFolderTarget, file.name);
                        if (file.isFile()) {
                            copyFile(pathSource, pathTarget, (err) => {
                            if (err) throw err;
                            });
                        }
                        });
                    });
                } else {
                    throw new Error('FS operation failed: folder files-copy already exists');
                }
              });
        }
    })
   

};

await copy();
