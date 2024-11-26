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


const genDiff = (filepath1, filepath2) => {
  const file1 = parseFile(filepath1);
  const file2 = parseFile(filepath2);

  const keys1 = _.sortBy(Object.keys(file1));
  const keys2 = _.sortBy(Object.keys(file2));

  const allKeys = _.sortBy(_.union(keys1, keys2)); 

  let diff = '{\n';

  allKeys.forEach((key) => {
    const val1 = file1[key];
    const val2 = file2[key];

    if (!_.has(file2, key)) {
      diff += `  - ${key}: ${val1}\n`;
    }
    else if (!_.has(file1, key)) {
      diff += `  + ${key}: ${val2}\n`;
    }
    else if (val1 !== val2) {
      diff += `  - ${key}: ${val1}\n`;
      diff += `  + ${key}: ${val2}\n`;
    }
    else {
      diff += `    ${key}: ${val1}\n`;
    }
  });

  diff += '}';

  return diff || 'The files are identical.'; 
};

export default genDiff;
