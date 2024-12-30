module.exports = {
  testMatch: [
    "**/__tests__/**/*.test.mjs",  // Паттерн для поиска тестов с расширением .test.mjs в папке __tests__
    "**/?(*.)+(spec|test).mjs"     // Паттерн для файлов с расширением .test.mjs и .spec.mjs
  ],
  transform: {
    "^.+\\.(js|mjs)$": "babel-jest",  // Преобразуем .js и .mjs файлы с помощью babel-jest
  },
};