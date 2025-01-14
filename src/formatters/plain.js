const formatPlain = (diff) => {
  const iter = (currentDiff, path = '') => {
    if (!Array.isArray(currentDiff)) {
      throw new TypeError('Expected currentDiff to be an array');
    }

    return currentDiff.flatMap((item) => {
      const fullPath = path ? `${path}.${item.key}` : item.key;
      switch (item.type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${JSON.stringify(item.value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'updated':
          return `Property '${fullPath}' was updated. From ${JSON.stringify(item.oldValue)} to ${JSON.stringify(item.value)}`;
        case 'nested':
          return iter(item.children, fullPath);
        default:
          return null;
      }
    }).filter(Boolean).join('\n');
  };

  return iter(diff);
};

export default formatPlain;
