#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js'; 

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')  
  .option('-f, --format [type]', 'output format')  
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2);  
    console.log(diff);  
  })
  .parse(process.argv);  
