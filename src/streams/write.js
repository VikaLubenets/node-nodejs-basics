import readline from 'node:readline';
import { dirname, join } from 'node:path';
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  

const write = async () => {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const file = join(__dirname, 'files', 'fileToWrite.txt');
    const stream = createWriteStream(file, { flags: 'a', encoding: 'utf-8' });

    console.log('Введите, пожалуйста, сообщение, которое нужно записать в файл fileToWrite.txt. Если хотите завершить ввод, введите close');

    readLine.on('line', (input) => {
        if(input === 'close'){
            console.log('Выполнение программы завершено');
            stream.end();
            process.exit();
        }
        stream.write(`${input}\n`);
    });

};

await write();