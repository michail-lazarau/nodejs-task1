import { pipeline } from 'node:stream/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256');

  await pipeline(
    createReadStream(filePath),
    hash
  );

  const hexHash = hash.digest('hex');
  console.log(hexHash);
};

await calculateHash();