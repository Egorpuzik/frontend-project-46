#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/genDiff.js';  
import path from 'path';
import fs from 'fs';

const program = new Command();


program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepathe1>', 'First file to compare')
  .argument('<filepathe2>', 'Second file to compare')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2, options) => {
    const filePath1 = path.resolve(file1);
    const filePath2 = path.resolve(file2);
    
    const result = genDiff(filePath1, filePath2);  

    console.log(`Diff between ${filePath1} and ${filePath2}:`);
    console.log(result);
  });


program.parse(process.argv);
