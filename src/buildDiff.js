import _ from 'lodash';

// Function to generate differences between two objects
const buildDiff = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  return allKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    return {
      key, type: 'updated', value1: data1[key], value2: data2[key],
    };
  });
};

export default buildDiff;
