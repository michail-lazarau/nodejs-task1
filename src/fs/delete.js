import { access, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const noSuchResourceErrorCode = 'ENOENT';

const remove = async () => {
    const filePath = join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await access(filePath);
        await unlink(filePath);
    } catch (err) {
        if (err.code === noSuchResourceErrorCode) {
            throw new Error('File not found', { cause: err });
        }
        throw err;
    }
};

await remove();