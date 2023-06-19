import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const file = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');

    const output = createReadStream(file);
    output.on('readable', () => {
        const data = output.read();
        if (data)
            hash.update(data);
        else {
            console.log(hash.digest('hex'));
        }
    });

};

await calculateHash();