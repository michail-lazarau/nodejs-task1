import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const source = createReadStream(join(__dirname, 'files', 'archive.gz'));
  const destination = createWriteStream(join(__dirname, 'files', 'fileToCompress.txt'));
  const gunzip = createGunzip();

  await pipeline(
    source,
    gunzip,
    destination
  );
};
// node src/zip/compress.js && node src/zip/decompress.js
await decompress();