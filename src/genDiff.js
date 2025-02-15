import fs from 'fs';
import path from 'path';
import parseData from './parser.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const fileData1 = fs.readFileSync(absolutePath1, 'utf8');
  const fileData2 = fs.readFileSync(absolutePath2, 'utf8');

  const extname1 = path.extname(absolutePath1).slice(1);
  const extname2 = path.extname(absolutePath2).slice(1);

  const data1 = parseData(fileData1, extname1);
  const data2 = parseData(fileData2, extname2);

  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
