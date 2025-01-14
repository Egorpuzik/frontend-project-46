import genDiff from './genDiff.js';
import formatPlain from './formatters/plain.js';

const genDiffWithPlainSupport = (filepath1, filepath2, format = 'stylish') => {
  if (format === 'plain') {
    return genDiff(filepath1, filepath2, 'plain'); // Используйте 'plain', а не 'stylish'
  }

  return genDiff(filepath1, filepath2, format);
};

export default genDiffWithPlainSupport;

