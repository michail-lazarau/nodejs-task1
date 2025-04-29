import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
// spawnChildProcess(['arg1', 'arg2']);
