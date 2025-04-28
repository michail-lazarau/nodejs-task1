import { access, rename as fsRename } from 'node:fs/promises';
import { join } from 'node:path';

const noSuchResourceErrorCode = 'ENOENT';
const resourceAlreadyExistsErrorCode = 'EEXIST';
const errorCodes = [noSuchResourceErrorCode, resourceAlreadyExistsErrorCode];

const rename = async () => {
    const sourceFilePath = join(__dirname, 'files', 'wrongFilename.txt');
    const destinationFilePath = join(__dirname, 'files', 'properFilename.md');

    try {
        await Promise.all([
            access(sourceFilePath),
            access(destinationFilePath).then(() => {
                const err = new Error('Destination file already exists');
                err.code = resourceAlreadyExistsErrorCode;
                throw err;
            }).catch((err) => {
                return err.code === noSuchResourceErrorCode ? Promise.resolve() : Promise.reject(err);
            })
        ]);

        await fsRename(sourceFilePath, destinationFilePath);
    } catch (err) {
        if (errorCodes.includes(err.code)) {
            throw new Error('FS operation failed', { cause: err });
        }
        throw err;
    }
};

await rename();