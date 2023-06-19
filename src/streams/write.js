import readline from 'readline';
import path from 'path';
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  

const write = async () => {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const file = path.join(__dirname, 'files', 'fileToWrite.txt');
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