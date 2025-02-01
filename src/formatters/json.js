import jsonFormatter from './jsonFormatter.js';

const formatters = {
  json: jsonFormatter,
};

export default (diff, format) => {
  const formatFunction = formatters[format];
  if (!formatFunction) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatFunction(diff);
};