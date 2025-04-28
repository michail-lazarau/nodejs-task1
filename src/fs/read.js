import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const noSuchResourceErrorCode = 'ENOENT';

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    try {
        const fileContent = await readFile(filePath, 'utf-8');
        console.log(fileContent);
    } catch (err) {
        if (err.code === noSuchResourceErrorCode) {
            throw new Error('FS operation failed', { cause: err });
        }
        throw err;
    }
};

await read();