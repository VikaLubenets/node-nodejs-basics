import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
    const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
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