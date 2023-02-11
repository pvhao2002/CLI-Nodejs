const fs = require('fs')
const path = require('path');
var myArgs = process.argv.slice(2);

const classifyByName = (sourceDir) => {
    const firstChar = sourceDir.toUpperCase().charAt(0);
    if (firstChar >= 'A' && firstChar <= 'D') {
        return "A-D";
    }
    if (firstChar >= 'E' && firstChar <= 'H') {
        return "E-H";
    }
    if (firstChar >= 'I' && firstChar <= 'L') {
        return "I-L";
    }
    if (firstChar >= 'M' && firstChar <= 'P') {
        return "M-P";
    }
    if (firstChar >= 'Q' && firstChar <= 'T') {
        return "Q-T";
    }
    if (firstChar >= 'U' && firstChar <= 'X') {
        return "U-X";
    }
    if (firstChar >= 'Y' && firstChar <= 'Z') {
        return "Y-Z";
    }
    return "other";
}


const handleFile = (context) => {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return;
        }
        files.forEach(file => {
            let classifiedFolder = path.join(context, classifyByName(file));
            if (!fs.existsSync(classifiedFolder)) {
                fs.mkdirSync(classifiedFolder, { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }

            let filePath = path.join(__dirname, file);
            let destPath = path.join(classifiedFolder,file);
            fs.copyFile(filePath, destPath, err => {
                if (err) {
                    return;
                }
            });
        });
    });
}


module.exports = {
    handleFile: handleFile
}
