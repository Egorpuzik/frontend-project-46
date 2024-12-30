export default {
  testMatch: ['**/__tests__/**/*.test.mjs'], // Укажите путь к тестовым файлам
  extensionsToTreatAsEsm: ['.mjs'], // Расширения, которые Jest будет обрабатывать как ESM
  transform: {
    '^.+\\.mjs$': 'babel-jest', // Используйте babel-jest для трансформации файлов
  },
  transformIgnorePatterns: ['/node_modules/'], // Исключите node_modules из трансформации
};
