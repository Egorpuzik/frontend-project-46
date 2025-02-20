import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const formats = [
    ['json', 'file1.json', 'file2.json'],
    ['yml', 'filepath1.yml', 'filepath2.yml'],
  ];

  test.each(formats)(
    'should correctly compare %s files in "stylish" format',
    (format, file1, file2) => {
      const file1Path = getFixturePath(file1);
      const file2Path = getFixturePath(file2);
      const expectedResult = readFixture('expected_stylish.txt');

      const diff = genDiff(file1Path, file2Path, 'stylish');
      expect(diff).toBe(expectedResult);
    },
  );

  test.each(formats)(
    'should correctly compare %s files in "plain" format',
    (format, file1, file2) => {
      const file1Path = getFixturePath(file1);
      const file2Path = getFixturePath(file2);
      const expectedResult = readFixture('expected_plain.txt');

      const diff = genDiff(file1Path, file2Path, 'plain');
      expect(diff).toBe(expectedResult);
    },
  );

  test.each(formats)(
    'should correctly compare %s files in "json" format',
    (format, file1, file2) => {
      const file1Path = getFixturePath(file1);
      const file2Path = getFixturePath(file2);
      const expectedResult = readFixture('expected_json.txt');

      const diff = genDiff(file1Path, file2Path, 'json');
      expect(diff).toBe(expectedResult);
    },
  );
});
