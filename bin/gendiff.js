#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>') 
  .option('-f, --format [type]', 'output format') 
  .helpOption('-h, --help', 'output usage information') 
  .parse(process.argv);

const options = program.opts();
const [filepath1, filepath2] = program.args;

console.log('Filepath1:', filepath1);
console.log('Filepath2:', filepath2);
console.log('Format:', options.format || 'default');
