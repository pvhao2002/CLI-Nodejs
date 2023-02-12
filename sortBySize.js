const fs = require("fs");
const path = require("path");
let myArgs = process.argv.slice(2);
const SIZE_VERY_BIG = 10 * 1024 * 1024
const SIZE_BIG = 5 * 1024 * 1024
const SIZE_MEDIUM = 1 * 1024 * 1024
const SIZE_SMALL = 100 * 1024
const util = require("util");

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const rename = util.promisify(fs.rename);
const mkdir = util.promisify(fs.mkdir);
const fsp = require("fs").promises;
const readdirAsync = dir => fsp.readdir(dir);
const statAsync = path => fsp.stat(path);
const mkdirAsync = (path, options) => fsp.mkdir(path, options);
const copyFileAsync = (src, dest) => fsp.copyFile(src, dest);

const classifyBySize = async (file) => {
    try {
        const stats = await stat(file);
        const size = stats.size;
        if (size > SIZE_VERY_BIG) {
            return "Verybig";
        } else if (size > SIZE_BIG) {
            return "Big";
        } else if (size > SIZE_MEDIUM) {
            return "Medium";
        } else if (size > SIZE_SMALL) {
            return "Small";
        } else {
            return "Tiny";
        }
    } catch (error) {
        console.log(error);
    }
}

const handleFile = async (context) => {
    try {
        const files = await readdir(context);

        for (const file of files) {
            if (file !== ".git" && file !== "node_modules" && file !== ".gitignore") {
                const statResult = await stat(path.join(context, file));
                if (statResult.isFile()) {
                    let classifiedFolder = path.join(context, await classifyBySize(file));
                    if (!fs.existsSync(classifiedFolder)) {
                        await mkdir(classifiedFolder, { recursive: true });
                    }
                    let filePath = path.join(context, file);
                    let destPath = path.join(classifiedFolder, file);
                    console.log(filePath);
                    console.log(destPath);
                    await rename(filePath, destPath);
                }
            }
        }
    } catch (err) {
        console.error(`size: ${err}`);
    }
};

const handleFileRoot = async (context) => {
    try {
        const files = await readdirAsync(__dirname);
        for (const file of files) {
            if (file !== ".git" && file !== "node_modules" && file !== ".gitignore") {
                const stat = await statAsync(file);
                if (stat.isFile()) {
                    let classifiedFolder = path.join(context, await classifyBySize(file));
                    if (!fs.existsSync(classifiedFolder)) {
                        await mkdirAsync(classifiedFolder, { recursive: true });
                    }
                    let filePath = path.join(__dirname, file);
                    let destPath = path.join(classifiedFolder, file);
                    await copyFileAsync(filePath, destPath);
                }
            }
        }
    } catch (err) {
        console.error(`size: ${err}`);
    }
};
module.exports = {
    handleFile: handleFile,
    handleFileRoot: handleFileRoot
}

