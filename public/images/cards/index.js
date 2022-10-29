const fs = require('fs')

// directory path
const dir = './equipments/epic'

// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err
  }

  // files object contains all files names
  // log them on console
  let arr = []
  files.forEach(file => {
    arr.push(`"epic/${file}"`)
  })
  console.log(arr.toString())
})