import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

const format = (diff, formatType) => {
  const formatter = formats[formatType];
  if (!formatter) {
    throw new Error(`Unknown format: ${formatType}`);
  }
  return formatter(diff);
};

export default format;
