import path from 'node:path';
import { release, version } from 'node:os';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import './files/c.cjs'; // executes the file 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

const aPath = './files/a.json';
const bPath = './files/b.json';

const dynamicImportJson = async (filePath) => {
    return (await import(filePath, { with: { type: 'json' } })).default;
};

const unknownObject = await dynamicImportJson(random > 0.5 ? aPath : bPath);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export default {
    unknownObject,
    myServer,
};
