const jsonFormatter = (diff) => JSON.stringify(diff, null, 2);

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