const formatStylish = (diff) => {
    const lines = diff.map((item) => {
      switch (item.type) {
        case 'added':
          return `  + ${item.key}: ${item.value}`;
        case 'removed':
          return `  - ${item.key}: ${item.value}`;
        case 'updated':
          return `  - ${item.key}: ${item.oldValue}\n  + ${item.key}: ${item.newValue}`;
        case 'unchanged':
          return `    ${item.key}: ${item.value}`;
        default:
          throw new Error(`Unknown type: ${item.type}`);
      }
    });
  
    return `{\n${lines.join('\n')}\n}`;
  };
  
  export default formatStylish;
  