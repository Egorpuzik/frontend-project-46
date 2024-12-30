import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compareObjects from './compare.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'), path.extname(filepath1));
  const data2 = parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'), path.extname(filepath2));

  const diff = compareObjects(data1, data2);

  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default gendiff;
