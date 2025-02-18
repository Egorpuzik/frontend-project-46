import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const formats = ['json', 'yml'];

  formats.forEach((format) => {
    test(`should correctly compare file1.${format} and file2.${format} in "stylish" format`, () => {
      const file1Path = getFixturePath(`file1.${format}`);
      const file2Path = getFixturePath(`file2.${format}`);
      const expectedResult = readFixture('expected_stylish.txt');

      const diff = genDiff(file1Path, file2Path, 'stylish');
      expect(diff).toBe(expectedResult);
    });

    test(`should correctly compare file1.${format} and file2.${format} in "plain" format`, () => {
      const file1Path = getFixturePath(`file1.${format}`);
      const file2Path = getFixturePath(`file2.${format}`);
      const expectedResult = readFixture('expected_plain.txt');

      const diff = genDiff(file1Path, file2Path, 'plain');
      expect(diff).toBe(expectedResult);
    });

    test(`should correctly compare file1.${format} and file2.${format} in "json" format`, () => {
      const file1Path = getFixturePath(`file1.${format}`);
      const file2Path = getFixturePath(`file2.${format}`);
      const expectedResult = readFixture('expected_json.txt');

      const diff = genDiff(file1Path, file2Path, 'json');
      expect(diff).toBe(expectedResult);
    });
  });
});
