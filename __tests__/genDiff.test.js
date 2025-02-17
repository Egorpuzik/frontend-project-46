import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('should correctly compare file1.json and file2.json in "stylish" format', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const expectedResult = readFixture('expected_stylish.txt');

    const diff = genDiff(file1Path, file2Path, 'stylish');
    expect(diff).toBe(expectedResult);
  });

  test('should correctly compare file1.json and file2.json in "plain" format', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const expectedResult = readFixture('expected_plain.txt');

    const diff = genDiff(file1Path, file2Path, 'plain');
    expect(diff).toBe(expectedResult);
  });

  test('should correctly compare file1.json and file2.json in "json" format', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');
    const expectedResult = readFixture('expected_json.txt');

    const diff = genDiff(file1Path, file2Path, 'json');
    expect(diff).toBe(expectedResult);
  });

  test('should return "The files are identical." for identical JSON files', () => {
    const filePath = getFixturePath('file1.json');
    const diff = genDiff(filePath, filePath);
    expect(diff).toBe('The files are identical.');
  });
});
