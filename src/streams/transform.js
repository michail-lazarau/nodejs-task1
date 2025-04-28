import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
  const reverser = new Transform({
    transform(chunk, _, callback) {
      const reversed = Array.from(chunk.toString()).reverse().join('');
      this.push(reversed + '\n');
      callback();
    }
  });

  await pipeline(
    process.stdin,
    reverser,
    process.stdout
  );
};

// echo "Hello" | node src/streams/transform.js
await transform();