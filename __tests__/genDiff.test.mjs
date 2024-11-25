import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
  const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  
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

  test('should return "The files are identical." for identical files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file1.json'); // Compare the same file
    
    const diff = genDiff(file1Path, file2Path);
    expect(diff).toBe('The files are identical.');
  });

  test('should handle empty files', () => {
    const emptyFilePath = getFixturePath('empty.json');
    const file1Path = getFixturePath('file1.json');
    
    const expectedResult = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;

    const diff = genDiff(file1Path, emptyFilePath);
    expect(diff).toBe(expectedResult);
  });
});
