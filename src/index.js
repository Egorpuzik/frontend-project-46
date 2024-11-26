import parse from './parsers.js';
import compareObjects from './compare.js';
import formatStylish from './formatters/stylish.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diff = compareObjects(data1, data2);
  return formatStylish(diff);
};

export default gendiff;
