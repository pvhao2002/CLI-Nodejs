const fs = require("fs");
const path = require("path");
let myArgs = process.argv.slice(2);
const SIZE_VERY_BIG = 10 * 1024 * 1024
const SIZE_BIG = 5 * 1024 * 1024
const SIZE_MEDIUM = 1 * 1024 * 1024
const SIZE_SMALL = 100 * 1024


const classifyBySize = (file) => {
    const size = fs.statSync(file).size;
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
}
const handleFile = (context) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return;
        }

        files.forEach(file => {

            fs.stat(file, (error, stat) => {
                if (error) {
                    return console.error(error);
                }
                if (stat.isFile()) {
                    let classifiedFolder = path.join(context, classifyBySize(file));
                    if (!fs.existsSync(classifiedFolder)) {
                        fs.mkdirSync(classifiedFolder, { recursive: true }, (err) => {
                            if (err) throw err;
                        });
                    }
                    let filePath = path.join(__dirname, file);
                    let destPath = path.join(classifiedFolder, file);
                    fs.copyFile(filePath, destPath, err => {
                        if (err) {
                            return;
                        }
                    });
                }
            });
        });
    });
}

module.exports = {
    handleFile: handleFile
}

