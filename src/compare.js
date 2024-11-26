const compareObjects = (data1, data2) => {
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  
    return keys.map((key) => {
      if (!Object.hasOwn(data1, key)) {
        return { key, type: 'added', value: data2[key] };
      }
      if (!Object.hasOwn(data2, key)) {
        return { key, type: 'removed', value: data1[key] };
      }
      if (data1[key] !== data2[key]) {
        return {
          key,
          type: 'updated',
          oldValue: data1[key],
          newValue: data2[key],
        };
      }
      return { key, type: 'unchanged', value: data1[key] };
    });
  };
  
  export default compareObjects;
  