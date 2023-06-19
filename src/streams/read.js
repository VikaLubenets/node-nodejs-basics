import { createReadStream } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const read = async () => {
    const file = path.join(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(file);

    stream.on('data', (chunk) => {
        process.stdout.write(chunk);
      });

};

await read();