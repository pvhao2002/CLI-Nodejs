const fs = require("fs");
const path = require('path');

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(file => {
      return fs.statSync(path.join(source, file.name)).isDirectory() && file.name !== ".git" && file.name !== "node_modules";
    })
    .map(dirent => dirent.name);

const getDirectoryPaths = (source, dirArray) => {
  const subDirs = getDirectories(source);
  subDirs.forEach(subDir => {
    dirArray.push(`${source}/${subDir}`);
    getDirectoryPaths(`${source}/${subDir}`, dirArray);
  });
  return dirArray;
};

const fileDir = {};
const dirArray = [];
const rootDir = __dirname

const directories = getDirectoryPaths(rootDir, dirArray);
directories.forEach((directory, index) => {
  fileDir[`dir${index + 1}`] = directory;
});

console.log(fileDir);
