import path from 'path';
import genDiff from '../src/genDiff.js';
import fs from 'fs';  
import plain from '../src/formatters/plain.js';

const getFixturePath = (filename) => path.join(process.cwd(), filename);

describe('genDiff', () => {
  test('should correctly compare file1.json and file2.json', () => {
    console.log(getFixturePath('file1.json')); 
    console.log(getFixturePath('file2.json'));
    
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.json');

    console.log('Content of file1.json:', fs.readFileSync(file1Path, 'utf-8'));
    console.log('Content of file2.json:', fs.readFileSync(file2Path, 'utf-8'));

    const expectedResult = `{
  - common: {
    setting1: Value 1
    setting2: 200
    setting3: true
    setting6: {
      key: value
      doge: {
        wow: 
    }
  }
}
  + common: {
    follow: false
    setting1: Value 1
    setting3: null
    setting4: blah blah
    setting5: {
      key5: value5
  }
    setting6: {
      key: value
      ops: vops
      doge: {
        wow: so much
    }
  }
}
  - group1: {
    baz: bas
    foo: bar
    nest: {
      key: value
  }
}
  + group1: {
    foo: bar
    baz: bars
    nest: str
}
  - group2: {
    abc: 12345
    deep: {
      id: 45
  }
}
  + group3: {
    deep: {
      id: {
        number: 45
    }
  }
    fee: 100500
}
}`;
    
    

const diff = genDiff(file1Path, file2Path, 'plain');
const formattedDiff = plain(diff); 
console.log(formattedDiff);
expect(formattedDiff).toBe(expectedResult);
});

test('should return "The files are identical." for identical JSON files', () => {
const filePath = getFixturePath('file1.json');
const diff = genDiff(filePath, filePath);
expect(diff).toBe('The files are identical.');
});
});
