import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const readable = createReadStream(join(__dirname, 'files', 'fileToRead.txt'));
  await pipeline(readable, process.stdout);
};

await read();