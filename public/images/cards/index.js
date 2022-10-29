const fs = require('fs')

// directory path
const dir = './halloween/equipments/rare legend'

// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err
  }

  // files object contains all files names
  // log them on console
  let arr = []
  files.forEach(file => {
    arr.push(`"halloween/equipments/rare legend/${file}"`)
  })
  console.log(arr.toString())
})