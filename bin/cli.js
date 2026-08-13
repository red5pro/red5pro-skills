#!/usr/bin/env node
import { run } from '../src/wizard.js';

run(process.argv.slice(2)).catch((err) => {
  process.stderr.write(`\n\x1b[31merror:\x1b[0m ${err.message}\n`);
  process.exit(1);
});
