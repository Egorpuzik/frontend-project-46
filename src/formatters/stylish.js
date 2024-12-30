const formatStylish = (diff) => {
  const typeActions = {
    added: (item) => `  + ${item.key}: ${item.value}`,
    removed: (item) => `  - ${item.key}: ${item.value}`,
    updated: (item) => `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`,
    unchanged: (item) => `    ${item.key}: ${item.value}`,
  };

  const lines = diff.map((item) => {
    if (!typeActions[item.type]) {
      throw new Error(`Unknown diff type: ${item.type}`);
    }
    return typeActions[item.type](item);
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default formatStylish;

  