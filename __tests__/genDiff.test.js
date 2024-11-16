import genDiff from '../src/genDiff.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

describe('genDiff', () => {
  test('compare JSON files with different keys and values', () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');
    const expectedOutput = fs.readFileSync(getFixturePath('expected_output.txt'), 'utf8').trim();

    const result = genDiff(filePath1, filePath2);
    expect(result).toBe(expectedOutput);
  });

  test('identical JSON files', () => {
    const filePath = getFixturePath('identical.json');
    const result = genDiff(filePath, filePath);
    expect(result).toBe('The files are identical.');
  });

  test('empty file comparison', () => {
    const emptyFilePath = getFixturePath('empty.json');
    const nonEmptyFilePath = getFixturePath('file1.json');
    const expectedOutput = fs.readFileSync(getFixturePath('empty_vs_file1.txt'), 'utf8').trim();

    const result = genDiff(emptyFilePath, nonEmptyFilePath);
    expect(result).toBe(expectedOutput);
  });
});
