#!/usr/bin/env node
const program = require("commander");
const fs = require('fs');
const path = require('path');
let i = 0;
fs.readdir(__dirname, (err, files) => {
  if (err) {
    return;
  }
  if (i == 2) process.exit(0)
  files.forEach(file => {
    let classifiedFolder = path.join("./abc", "test");
    if (!fs.existsSync(classifiedFolder)) {
      fs.mkdirSync(classifiedFolder, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }

    let filePath = path.join(__dirname, file);
    let destPath = path.join(classifiedFolder, file);
    fs.rename(filePath, destPath, err => {
      if (err) {
        return;
      }
    });

  });
});

// program
//   .version("1.0.0")
//   .description("An example CLI for managing a directory")
//   .option("--type, --type <value>", "handle file type")
//   .option("--size, --size", "handle file size")
//   .option("--modify, --modify", "handle file modification time")
//   .option("--name, --name", "handle file name");

// let lastOption;

// program
//   .action(function (options) {
//     const sourceFile = '.';
//     const destinationFile = './abc';

//     fs.rename(sourceFile, destinationFile, (err) => {
//       if (err) throw err;
//       console.log(`${sourceFile} was moved to ${destinationFile}`);
//     });
//   })
//   .on("option:type", function (value) {
//     lastOption = "type";
//     console.log("value of --type:", value);
//   })
//   .on("option:size", function () {
//     lastOption = "size";
//     console.log("--size");
//   })
//   .on("option:modify", function () {
//     lastOption = "modify";
//     console.log("--modify");
//   })
//   .on("option:name", function () {
//     lastOption = "name";
//     console.log("--name");
//   });

// program.parse(process.argv);
