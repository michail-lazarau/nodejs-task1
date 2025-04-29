import { parseArgs as parseArgsUtil } from 'node:util';

const allowsUnrecognizedOptions = false; // arbitrary options
const allowsArguments = true;

const parseArgs = () => {
    const { values } = parseArgsUtil({
        strict: allowsUnrecognizedOptions,
        allowPositionals: allowsArguments
    });

    for (const [key, value] of Object.entries(values)) {
        console.log(`${key} is ${value}`);
    }
};

// node src/cli/args.js --name Alice --age 30
parseArgs();