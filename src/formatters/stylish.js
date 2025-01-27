const formatStylish = (diff) => {
  const map = (children) => children.map((child) => {
    if (!typeActions[child.type]) {
      throw new Error(`Unknown diff type: ${child.type}`);
    }
    return typeActions[child.type](child);
  }).join('\n');

  const typeActions = {
    added: (item) => `  + ${item.key}: ${item.value}`,
    removed: (item) => `  - ${item.key}: ${item.value}`,
    unchanged: (item) => `    ${item.key}: ${item.value}`,
    updated: (item) => `  ~ ${item.key}: ${item.oldValue} -> ${item.newValue}`,
    nested: (item) => `    ${item.key}: {\n${map(item.children)}\n    }`,
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
