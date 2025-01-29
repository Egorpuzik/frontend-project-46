import fs from 'fs';
import path from 'path';
import parseData from './parser.js';
import buildDiff from './buildDiff.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

// Mapping formats to their corresponding formatters
const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

// Main function to generate difference between two files
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  if (!fs.existsSync(absolutePath1) || !fs.existsSync(absolutePath2)) {
    throw new Error(`One or both files not found: ${absolutePath1}, ${absolutePath2}`);
  }

  const fileData1 = fs.readFileSync(absolutePath1, 'utf8');
  const fileData2 = fs.readFileSync(absolutePath2, 'utf8');

  const extname1 = path.extname(absolutePath1).slice(1);
  const extname2 = path.extname(absolutePath2).slice(1);

  const data1 = parseData(fileData1, extname1);
  const data2 = parseData(fileData2, extname2);

  // Check if files are identical
  if (_.isEqual(data1, data2)) {
    return 'The files are identical.';
  }

  const diff = buildDiff(data1, data2);

  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default genDiff;