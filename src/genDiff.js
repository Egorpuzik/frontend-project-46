import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileData = fs.readFileSync(fullPath, 'utf8');
  const extname = path.extname(fullPath);

  switch (extname) {
    case '.json':
      return JSON.parse(fileData);
    case '.yaml':
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};

const formatValue = (value, indent = 4) => {
  if (_.isObject(value)) {
    return `{\n${Object.keys(value).map((key) => {
      const val = value[key];
      const formattedVal = _.isObject(val) ? formatValue(val, indent + 2) : val;
      return `${' '.repeat(indent)}${key}: ${formattedVal}`;
    }).join('\n')}\n${' '.repeat(indent - 4)}}`;
  }
  return value;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const keys1 = _.sortBy(Object.keys(file1));
  const keys2 = _.sortBy(Object.keys(file2));

  const allKeys = _.sortBy(_.union(keys1, keys2));

  let diff = '{\n';
  let isIdentical = true;

  allKeys.forEach((key) => {
    const val1 = file1[key];
    const val2 = file2[key];

    if (!_.has(file2, key)) {
      diff += `  - ${key}: ${formatValue(val1)}\n`;
      isIdentical = false;
    } else if (!_.has(file1, key)) {
      diff += `  + ${key}: ${formatValue(val2)}\n`;
      isIdentical = false;
    } else if (!_.isEqual(val1, val2)) {
      if (_.isObject(val1) && _.isObject(val2)) {
        diff += `  - ${key}: ${formatValue(val1)}\n`;
        diff += `  + ${key}: ${formatValue(val2)}\n`;
      } else {
        diff += `  - ${key}: ${formatValue(val1)}\n`;
        diff += `  + ${key}: ${formatValue(val2)}\n`;
      }
      isIdentical = false;
    } else {
      diff += `    ${key}: ${formatValue(val1)}\n`;
    }
  });

  diff += '}';

  return isIdentical ? 'The files are identical.' : diff;
};

export default genDiff;
