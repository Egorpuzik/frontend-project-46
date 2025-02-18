import yaml from 'js-yaml';

// Pure parser function that works with raw data
const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported data format: ${format}`);
  }
};

export default parseData;
