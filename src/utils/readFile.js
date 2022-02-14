const fs = require('fs');

export const readFile = (file: any) => {
  return fs.readFileSync(file);
};
