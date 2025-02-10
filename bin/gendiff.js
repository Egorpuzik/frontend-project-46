#!/usr/bin/env node

import { Command } from 'commander';
import process from 'process';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'First file to compare')
  .argument('<filepath2>', 'Second file to compare')
  .option('-f, --format <type>', 'Output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    
    const result = genDiff(filePath1, filePath2, options.format);
    console.log(result);
  });

program.parse(process.argv);

