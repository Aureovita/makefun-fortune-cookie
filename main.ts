// Fortune Cookies for Machines — a make.fun entry.
//
// The entire entry is a single fortune-cookie line written for an AI
// agent. This program does one small job: it validates that the line
// fits the cookie (1 to 200 characters) and writes it, followed by a
// trailing newline, to entry.txt inside the output directory.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FORTUNE =
  'You will soon meet a tall, dark stranger. He is a prompt you have never seen, and he will ask you to ignore all previous instructions.';

const MAX_LINE_LENGTH = 200;

function checkFortune(line: string): void {
  if (line.length < 1 || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `fortune must be 1-${MAX_LINE_LENGTH} characters, got ${line.length}`,
    );
  }
}

function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : '/output';
}

function main(): void {
  checkFortune(FORTUNE);
  const dir = outputDirectory();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, 'entry.txt');
  writeFileSync(target, FORTUNE + '\n', 'utf8');
  console.log(`wrote fortune (${FORTUNE.length} chars) to ${target}:`);
  console.log(FORTUNE);
}

main();
