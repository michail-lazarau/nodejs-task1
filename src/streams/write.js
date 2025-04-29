import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const writable = createWriteStream(join(__dirname, 'files', 'fileToWrite.txt'));
  await pipeline(process.stdin, writable);
};

// echo "Hello World" | node src/streams/write.js
await write();