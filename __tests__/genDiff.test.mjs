import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

  test('should correctly compare flat JSON files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');

    const expectedResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toBe(expectedResult);
  });

  test('should return "The files are identical." for identical JSON files', () => {
    const filePath = getFixturePath('file1.json');
    const diff = genDiff(filePath, filePath);
    expect(diff).toBe('The files are identical.');
  });

  test('should correctly compare flat YAML files', () => {
    const file1Path = getFixturePath('file1.yml');
    const file2Path = getFixturePath('file2.yml');

    const expectedResult = `{
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
    follow: false
    host: hexlet.io
}`;
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toBe(expectedResult);
  });

  test('should return "The files are identical." for identical YAML files', () => {
    const filePath = getFixturePath('file1.yml');
    const diff = genDiff(filePath, filePath);
    expect(diff).toBe('The files are identical.');
  });

  test('should handle comparison between JSON and YAML files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file1.yml');

    const diff = genDiff(file1Path, file2Path);
    expect(diff).toBe('The files are identical.');
  });
});
