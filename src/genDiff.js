import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(filepath1, 'utf8');
  const file2 = fs.readFileSync(filepath2, 'utf8');

  if (file1 === file2) {
    return 'The files are identical.';
  } else {
    return 'The files are different.';
  }
};

export default genDiff;
