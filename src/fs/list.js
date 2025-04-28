import { access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const noSuchResourceErrorCode = 'ENOENT';

const list = async () => {
    const directoryPath = join(__dirname, 'files');

    try {
        await access(directoryPath);
        const files = await readdir(directoryPath);
        console.log(files.join('\n'));
    } catch (err) {
        if (err.code === noSuchResourceErrorCode) {
            throw new Error('FS operation failed', { cause: err });
        }
        throw err;
    }
};

await list();