import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const iter = (nodes, parent) => {
  if (!Array.isArray(nodes)) {
    throw new TypeError('Expected nodes to be an array');
  }

  return nodes
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;

      switch (node.type) {
        case 'nested': {
          const nestedResult = iter(node.children, property);
          return nestedResult;
        }
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'unchanged':
          return null; 
        default:
          throw new Error(`Unknown type: ${node.type}`);
      }
    })
    .filter(Boolean) 
    .join('\n'); 
};

const formatPlain = (diff) => iter(diff, '');

export default formatPlain;

