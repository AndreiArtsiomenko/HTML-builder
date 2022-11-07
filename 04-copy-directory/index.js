const fs = require('fs').promises;
const path = require('path');

(async function () {
  try {
    const pathFolder = path.join(__dirname, 'files');
    const creatFolder = fs.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: true
    });
    const pathFolderCopy = path.join(__dirname, 'files-copy');

    const filesCopy = await fs.readdir(pathFolderCopy);

    for (let file of filesCopy) {
      fs.unlink(path.join(pathFolderCopy, file));
    }

    const files = await fs.readdir(pathFolder, {
      withFileTypes: true
    });

    for (let file of files) {
      fs.copyFile(path.join(pathFolder, file.name), path.join(pathFolderCopy, file.name));
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
})();