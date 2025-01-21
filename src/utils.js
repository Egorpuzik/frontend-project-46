import path from 'path';

export const getFixturePath = (fileName) => path.resolve(process.cwd(), '__fixtures__', fileName);
