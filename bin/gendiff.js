#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import process from 'process';
import genDiff from '../src/genDiff.js';

const program = new Command();

const supportedFormats = ['stylish', 'plain', 'json']; // Добавляем список поддерживаемых форматов

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'First file to compare')
  .argument('<filepath2>', 'Second file to compare')
  .option('-f, --format <type>', 'Output format', 'stylish') // По умолчанию "stylish"
  .action((filepath1, filepath2, options) => {
    try {
      if (!supportedFormats.includes(options.format)) {
        throw new Error(
          `Unsupported format: ${options.format}. Supported formats: ${supportedFormats.join(', ')}`,
        );
      }

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
