import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const source = createReadStream(join(__dirname, 'files', 'fileToCompress.txt'));
  const destination = createWriteStream(join(__dirname, 'files', 'archive.gz'));
  const gzip = createGzip();

  await pipeline(
    source,
    gzip,
    destination
  );
};

await compress();