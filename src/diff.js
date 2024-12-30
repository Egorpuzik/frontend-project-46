const buildDiff = (data1, data2) => {
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  
    return keys.map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return { key, type: 'added', value: data2[key] };
      }
      if (!Object.hasOwn(data2, key)) {
        return { key, type: 'removed', value: data1[key] };
      }
      if (data1[key] === data2[key]) {
        return { key, type: 'unchanged', value: data1[key] };
      }
      if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
      }
      return { key, type: 'changed', value1: data1[key], value2: data2[key] };
    });
  };
  
  export default buildDiff;
  