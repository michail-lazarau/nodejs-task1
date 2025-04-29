import { access, cp } from 'node:fs/promises';
import { join } from 'node:path';

const noSuchResourceErrorCode = 'ENOENT';
const resourceAlreadyExistsErrorCode = 'EEXIST';
const errorCodes = [noSuchResourceErrorCode, resourceAlreadyExistsErrorCode];

const copy = async () => {
    const sourceFilePath = join(__dirname, 'files');
    const destinationFilePath = join(__dirname, 'files_copy');

    try {
        await access(sourceFilePath);
        await cp(sourceFilePath, destinationFilePath, { recursive: true, errorOnExist: true });
    } catch (err) {
        if (errorCodes.includes(err.code)) {
            throw new Error('FS operation failed', { cause: err });
        }
        throw err;
    }
};

await copy();
