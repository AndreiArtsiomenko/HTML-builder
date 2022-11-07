const fs = require('fs').promises;
const path = require('path');

(async function () {
  try {
    const pathFolder = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(pathFolder, {
      withFileTypes: true
    });

    for (let file of files) {
      if (file.isFile()) {
        const fileOn = await fs.stat(path.join(pathFolder, file.name));
        const fileName = path.basename(file.name).split('.')[0];
        const fileExt = path.extname(file.name).slice(1);
        const fileSize = fileOn.size;
        console.log(`${fileName} - ${fileExt} - ${fileSize}`);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
})();