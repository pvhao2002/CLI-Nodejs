const fs = require('fs')
const path = require('path');
var myArgs = process.argv.slice(2);

const exctFileImage = ['.gif', '.pjp', '.pjpeg', '.jfif', '.jpeg', '.jpg', '.png',
    '.svg', '.webp', '.ai', '.bmp', '.ico']
const exctFileText = ['.doc', '.docx', '.odt', '.pdf', '.rtf', '.tex', '.txt', '.wpd']
const exctFileBash = ['.sh', '.bash', '.bashrc']

const imageRegex = /\.(gif|pjp|pjpeg|jfif|jpeg|jpg|png|svg|webp|bmp|ico)$/i;
const textRegex = /\.(doc|docx|odt|pdf|rtf|tex|txt|wpd)$/i;
const bashRegex = /\.(sh|bash|bashrc)$/i;
const otherRegex = new RegExp(`^((?!${imageRegex.source}|${textRegex.source}|${bashRegex.source}).)*$`, 'i');

// const isFileImage = (context) => {
//     return exctFileImage.includes(path.extname(context));
// }
// const isFileText = (context) => {
//     return exctFileText.includes(path.extname(context));
// }

// const isFileBash = (context) => {
//     return exctFileBash.includes(path.extname(context));
// }

// const typeList = ["images", "texts", "bash", "other"]
// const argFileType = myArgs[2]

const checkFileRegex = (file) => {
    switch (file) {
        case "images": return imageRegex;
        case "texts": return textRegex;
        case "bash": return bashRegex;
        case "others": return otherRegex;
        default: return otherRegex;
    }
}
const copyFileToTargetDir = async (targetDirectory, fileType) => {
    const fileRegex = checkFileRegex(fileType);
    const files = await fs.promises.readdir(__dirname);
    for (const file of files) {
        if (file !== ".git" && file !== "node_modules"  && file !== ".gitignore") {
            const sourcePath = path.join(__dirname, file);
            const targetPath = path.join(targetDirectory, file);
            // Check if source directory contains '.git'
            const stat = await fs.promises.stat(sourcePath);
            if (!stat.isFile()) {
                continue;
            }
            if (file.match(fileRegex)) {
                await fs.promises.copyFile(sourcePath, targetPath);
            }
        }
    }
}

const moveFileToTargetDir = async (source, targetDirectory, fileType) => {
    const fileRegex = checkFileRegex(fileType);
    const files = await fs.promises.readdir(source);
    for (const file of files) {
        if (file !== ".git" && file !== "node_modules"  && file !== ".gitignore") {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(targetDirectory, file);
            // Check if source directory contains '.git'
            const stat = await fs.promises.stat(sourcePath);
            if (!stat.isFile()) {
                continue;
            }
            if (file.match(fileRegex)) {
                await fs.promises.rename(sourcePath, targetPath);
            }
        }
    }
}

const handleFile = async (source, targetDirectory, fileType) => {
    targetDirectory = path.join(targetDirectory, fileType)
    if (!fs.existsSync(targetDirectory)) {
        await fs.promises.mkdir(targetDirectory, { recursive: true });
    }
    await moveFileToTargetDir(source, targetDirectory, fileType);
}

const handleFileRoot = async (targetDirectory, fileType) => {
    targetDirectory = path.join(targetDirectory, fileType)
    if (!fs.existsSync(targetDirectory)) {
        await fs.promises.mkdir(targetDirectory, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    await copyFileToTargetDir(targetDirectory, fileType);
}

module.exports = {
    handleFile: handleFile,
    handleFileRoot: handleFileRoot
}