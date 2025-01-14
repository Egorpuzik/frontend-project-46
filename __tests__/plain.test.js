import plain from '../formatters/plain.js';

test('Plain format outputs expected diff', () => {
  const diff = [
    { key: 'common.setting2', type: 'removed' },
    { key: 'common.setting3', type: 'updated', oldValue: true, value: null },
  ];

  const result = plain(diff);
  expect(result).toBe(
    "Property 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null"
  );
});
