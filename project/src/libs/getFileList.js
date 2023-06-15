const fs = require('fs');
const path = require('path');

function getFileList(directory) {
  const files = fs.readdirSync(directory);
  const fileList = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      fileList.push(file);
    }
  });

  return fileList;
}

module.exports = getFileList;