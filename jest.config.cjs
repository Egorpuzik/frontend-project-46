module.exports = {
  transform: {}, 
  testMatch: ['**/__tests__/**/*.test.mjs'], 
  moduleFileExtensions: ['js', 'mjs'], 
  transform: {
    '^.+\\.mjs$': 'babel-jest',  
  },
   
};
