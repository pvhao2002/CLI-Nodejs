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


const createFolder = async (targetDirectory) => {
    if (!fs.existsSync(targetDirectory)) {
        await fs.promises.mkdir(targetDirectory, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
}
const checkFileRegex = (file) => {
    switch (file) {
        case "images": return imageRegex;
        case "texts": return textRegex;
        case "bash": return bashRegex;
        case "others": return otherRegex;
        default: return otherRegex;
    }
}

const copyFileToTargetDir = (targetDirectory, fileType) => {
    const fileRegex = checkFileRegex(fileType);
    fs.readdir(__dirname, (err, files) => {
        if (err) throw err;
        
        files.forEach((file) => {
            const sourcePath = path.join(__dirname, file);
            const targetPath = path.join(targetDirectory, file);
            // Check if source directory contains '.git'
            if (file === ".git") return;
            fs.stat(file, (err, stat) => {
                if (err) {
                    return;
                }
                if (!stat.isFile()) {
                    return;
                }
                if (file.match(fileRegex)) {
                    fs.copyFile(sourcePath, targetPath, (copyError) => {
                        if (copyError) throw copyError;
                        fs.stat(sourcePath, (err, srcStat) => {
                            if (err) throw err;
                            fs.utimes(targetPath, srcStat.atime, srcStat.mtime, (err) => {
                                if (err) throw err;
                            });
                        });
                    });
                }
            })

        });
    });
}

const handleFile = async (targetDirectory, fileType) => {
    targetDirectory = path.join(targetDirectory, fileType)
    await createFolder(targetDirectory);
    copyFileToTargetDir(targetDirectory, fileType);
}

module.exports = {
    handleFile: handleFile
}