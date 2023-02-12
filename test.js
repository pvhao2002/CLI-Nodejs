const fs = require("fs");
const path = require('path');
const { Command } = require("commander");

const sortBySize = require("./sortBySize")
const sortByName = require("./sortByName")
const sortByModify = require("./sortByModify")
const myArgs = process.argv.slice(2)
const util = require("util");
const program = new Command();

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
async function getDirectories(directoryPath) {
  try {
    const files = await readdir(directoryPath);
    const promises = files.map(async (file) => {
      const newDirPath = path.join(directoryPath, file)
      const fileStat = await stat(newDirPath);
      return fileStat.isDirectory() ? newDirPath : null;
    });

    const directories = (await Promise.all(promises)).filter((d) => d);

    return directories;
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
}



let options = [];

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("--type, --type <value>", "handle file type")
  .option("--size, --size", "handle file size")
  .option("--modify, --modify", "handle file modification time")
  .option("--namee, --name", "handle file name")
  .action(() => {
    console.log("hi");
  })
  .on("option:type", async () => {
    options.push("--type");

  })
  .on("option:size", async () => {
    options.push("--size");
  })
  .on("option:modify", async () => {
    options.push("--modify");
    console.log("modify");
  })
  .on("option:name", async () => {
    options.push("--name");
    console.log("name");
  })

  .parse(process.argv)
let fileType = program.opts().type.split(",").map(e => e.trim())
fileType.map(e => e.toLowerCase())
if (fileType) {
  for (const item of fileType) {
    console.log(`File: ${item}`);
  }
}
// let status = 0;

// const start = async () => {
//   const context = myArgs[0]
//   await fs.promises.mkdir(context, { recursive: true });
//   for (const item of options) {
//     switch (item) {
//       case "--type":

//         break;
//       case "--modify":
//         switch (status) {
//           case 0:
//             break;
//           case 1:
//             const listDir = await getDirectories(context)
//             for (const ii of listDir) {
//               const dir = path.join("./abc", ii);
//               await sortByModify.handleFile(ii);
//             }
//             break;
//           default:
//             break;
//         }
//         break;
//       case "--name":
//         switch (status) {
//           case 0:
//             await sortByName.handleFileRoot(context);
//             break;

//           default:
//             break;
//         }
//         break;
//       case "--size":
//         console.log(status);
//         switch (status) {
//           case 2:
//             const listDir = await getDirectories(context)
//             for (const ii of listDir) {
//               const listChildDir = await getDirectories(ii)
//               for (const jj of listChildDir) {
//                 console.log(jj);
//                 await sortBySize.handleFile(jj);
//               }
//             }
//             break;

//           default:
//             break;
//         }
//         break;
//       default:
//         break;
//     }
//     status++
//   }
// }
// start()

// const run = async () => {

//   console.log("start handle file by name");
//   await sortByName.handleFileRoot("./abc");
//   console.log("finish sort name");
//   const listDir = await getDirectories("./abc")
//   for (const item of listDir) {
//     const dir = path.join("./abc", item);
//     await sortByModify.handleFile(item);
//   }
//   console.log("finish sort modify");
// }