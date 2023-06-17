import fs from 'fs';
import { access, constants } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const pathFolderCurr = path.resolve(__dirname, 'files');
    const pathFolderTarget = path.resolve(__dirname, 'files-copy');

    access(pathFolderCurr, constants.F_OK, (err) => {
        if (err){
            
            throw new Error('FS operation failed: folder files does not exist');

        } else {
            access(pathFolderTarget, constants.F_OK, (err) => {
                if (err) {
                    fs.mkdir(pathFolderTarget, err => {
                        if (err) throw err;
                        console.log('Folder created successfully');
                    });
                    
                    fs.readdir(pathFolderCurr, { withFileTypes: true }, (err, files) => {
                        if (err) {
                        return console.log(`Error reading directory: ${err}`);
                        }
                        files.forEach((file) => {
                        const pathSource = path.join(pathFolderCurr, file.name);
                        const pathTarget = path.join(pathFolderTarget, file.name);
                        if (file.isFile()) {
                            fs.copyFile(pathSource, pathTarget, (err) => {
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
