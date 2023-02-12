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


const handleFile = async (context) => {
    try {
        const files = await fs.promises.readdir(context);
        for (const file of files) {
            if (file !== ".git" && file !== "node_modules" && file !== ".gitignore") {
                const stat = await fs.promises.stat(path.join(context, file));
                if (stat.isFile()) {
                    const classifiedFolder = path.join(context, classifyByName(file));
                    if (!fs.existsSync(classifiedFolder)) {
                        await fs.promises.mkdir(classifiedFolder, { recursive: true });
                    }

                    const filePath = path.join(context, file);
                    const destPath = path.join(classifiedFolder, file);
                    await fs.promises.rename(filePath, destPath);
                }
            }
        }
    } catch (error) {
        console.error(`name: ${error}`);
    }
};






const handleFileRoot = async (context) => {
    try {
        const files = await fs.promises.readdir(__dirname);
        for (const file of files) {
            if (file !== ".git" && file !== "node_modules" && file !== ".gitignore") {
                const stat = await fs.promises.stat(path.join(__dirname, file));
                if (stat.isFile()) {
                    let classifiedFolder = path.join(context, classifyByName(file));
                    if (!fs.existsSync(classifiedFolder)) {
                        await fs.promises.mkdir(classifiedFolder, { recursive: true });
                    }
                    let filePath = path.join(__dirname, file);
                    let destPath = path.join(classifiedFolder, file);
                    await fs.promises.copyFile(filePath, destPath);
                }

            }
        }
    } catch (err) {
        console.error(`name root: ${err}`);
    }
}
module.exports = {
    handleFile: handleFile,
    handleFileRoot: handleFileRoot
}
