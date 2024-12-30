#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';
import path from 'path';
import process from 'process';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'First file to compare')
  .argument('<filepath2>', 'Second file to compare')
  .option('-f, --format <type>', 'Output format', 'stylish') 
  .action((filepath1, filepath2, options) => {
    try {
      const filePath1 = path.resolve(filepath1);
      const filePath2 = path.resolve(filepath2);

      const result = genDiff(filePath1, filePath2, options.format);

      console.log(result); 
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); 
    }
  });

program.parse(process.argv);
