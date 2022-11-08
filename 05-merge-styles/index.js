const fs = require('fs');
const path = require('path');

const stylePath = path.join(__dirname, 'styles')
const bundleStream = fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));

fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {
  
  if (err) {
    console.error(err)
    return
  }

  files.forEach(file => {

    const fileExt = path.extname(file.name).slice(1);

    if (file.isFile() && fileExt === 'css') {
      const fileStream = fs.createReadStream(path.join(stylePath, file.name), 'utf-8');
      fileStream.pipe(bundleStream)
    }

  })
});


