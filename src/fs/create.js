import { open } from 'node:fs/promises';
import { join } from 'node:path';

const failIfExistsFlag = 'wx';
const fileExistsErrorCode = 'EEXIST';

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const fileContent = "I am fresh and young";

    try {
        const fileDescriptorManager = await open(filePath, failIfExistsFlag);
        await fileDescriptorManager.write(fileContent);
        await fileDescriptorManager.close();
    } catch (err) {
        if (err.code === fileExistsErrorCode) {
            throw new Error('File already exists', { cause: err });
        }
        throw err;
    }     
};

await create();