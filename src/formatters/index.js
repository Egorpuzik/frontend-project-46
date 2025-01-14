import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compareObjects from './compare.js';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

// Форматы вывода
const formats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

// Функция для безопасного чтения файла
const readFileSafely = (filePath) => {
  try {
    return fs.readFileSync(path.resolve(filePath), 'utf-8');
  } catch (err) {
    throw new Error(`Error reading file at ${filePath}: ${err.message}`);
  }
};

// Валидация расширения файла
const validateFileExtension = (filePath) => {
  const ext = path.extname(filePath).slice(1);
  if (!['json', 'yml', 'yaml'].includes(ext)) {
    throw new Error(`Unsupported file extension: ${ext}`);
  }
  return ext;
};

// Основная функция сравнения файлов
const gendiff = (filepath1, filepath2, format = 'stylish') => {
  // Проверка и чтение файлов
  validateFileExtension(filepath1);
  validateFileExtension(filepath2);

  const data1 = parse(readFileSafely(filepath1), path.extname(filepath1));
  const data2 = parse(readFileSafely(filepath2), path.extname(filepath2));

  // Сравнение данных
  const diff = compareObjects(data1, data2);

  // Выбор форматера
  const formatter = formats[format];
  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(diff);
};

export default gendiff;
