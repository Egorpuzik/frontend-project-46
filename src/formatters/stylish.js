const INDENT_SIZE = 4;
const INDENT_TYPE = ' ';

const makeIndent = (depth) => INDENT_TYPE.repeat(depth * INDENT_SIZE - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const result = Object.entries(value)
    .map(([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${result}\n${makeIndent(depth)}  }`;
};

const typeHandlers = {
  added: (node, depth) => `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
  unchanged: (node, depth) => `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
  updated: (node, depth) => [
    `${makeIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`,
    `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`,
  ].join('\n'),
  nested: (node, depth, iter) => `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${makeIndent(depth)}  }`,
};

const formatStylish = (diff) => {
  const iter = (tree, depth) => tree
    .map((node) => {
      const handler = typeHandlers[node.type];
      if (!handler) {
        throw new Error(`Unknown diff type: ${node.type}`);
      }
      return handler(node, depth, iter);
    })
    .join('\n');

  return `{\n${iter(diff, 1)}\n}`;
};

export default formatStylish;
