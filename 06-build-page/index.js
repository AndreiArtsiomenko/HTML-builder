const fs = require('fs');
const path = require('path');

const {stdin, stdout} = process


fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    console.error(err)
    return
  }
})

const folderProject = path.join(__dirname, 'project-dist');

fs.copyFile(path.join(__dirname, 'template.html'), path.join(folderProject, 'index.html'), err => {

  if (err) {
    console.error(err)
    return
  }

  fs.readFile(path.join(folderProject, 'index.html'), 'utf-8', (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    const folderComponents = path.join(__dirname, 'components')

    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {

      if (err) {
        console.error(err)
        return
      }

      files.forEach(file => {
        fs.readFile(path.join(folderComponents, file.name), 'utf-8', (err, dataFile) => {
          if (err) {
            console.error(err)
            return
          }

          const component = file.name.split('.')[0];

          data = data.replace(`{{${component}}}`, dataFile);

          fs.writeFile(path.join(folderProject, 'index.html'), data, err => {
            if (err) {
              console.error(err)
              return
            }
          })
        })
      })
    })
  })
})



//------ Copy styles -----------------------------------------

const stylePath = path.join(__dirname, 'styles');
const styleStream = fs.createWriteStream(path.join(folderProject, 'style.css'))

fs.readdir(stylePath, { withFileTypes: true }, (err, files) => {

  if (err) {
    console.error(err)
    return
  }
 
  files.forEach(file => {

    const fileExt = path.extname(file.name).slice(1);

    if (file.isFile() && fileExt === 'css') {
      const fileStream = fs.createReadStream(path.join(stylePath, file.name), 'utf-8');
      fileStream.pipe(styleStream)
    }
  });
})


//------ Copy directory assets -----------------------------------------

const assetsPath = path.join(__dirname, 'assets')
const newAssetsPath = path.join(folderProject, 'assets')

fs.mkdir(newAssetsPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err)
    return
  }
})

function copyDirectory(dir, newDir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {

    if (err) {
      console.error(err)
      return
    }

    files.forEach(file => {

      if (file.isFile()) {
        fs.copyFile(path.join(dir, file.name), path.join(newDir, file.name), (err) => {
          if (err) {
            console.error(err)
            return
          }
        });
      } else if (file.isDirectory) {
        
        // fs.readdir(path.join(newDir, file.name), (err, files) => {

        //   if (err) {
        //     console.error(err)
        //     return
        //   }

        //   for (let file of files) {
        //     fs.rmdir(path.join(newDir, file.name), err => {
        //       if (err) {
        //         console.error(err)
        //         return
        //       }
        //     });
        //   }
        // })
        fs.mkdir(path.join(newDir, file.name), { recursive: true }, (err) => {
          if (err) {
            console.error(err)
            return
          }
        })

        copyDirectory(path.join(assetsPath, file.name), path.join(newAssetsPath, file.name))
      }
    })

  });
}

copyDirectory(assetsPath, newAssetsPath)
