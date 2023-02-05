const fs = require('fs')
const path = require('path');
const { Command } = require("commander");
const program = new Command();
var myArgs = process.argv.slice(2);



const exctFileImage = ['.gif', '.pjp', '.pjpeg', '.jfif', '.jpeg', '.jpg', '.png',
    '.svg', '.webp', '.ai', '.bmp', '.ico']
const exctFileText = ['.doc', '.docx', '.odt', '.pdf', '.rtf', '.tex', '.txt', '.wpd']
const exctFileBash = ['.sh', '.bash', '.bashrc']

// const isFileImage = (context) => {
//     return exctFileImage.includes(path.extname(context));
// }
// const isFileText = (context) => {
//     return exctFileText.includes(path.extname(context));
// }

// const isFileBash = (context) => {
//     return exctFileBash.includes(path.extname(context));
// }


const validContext = (_context) => {
    if (myArgs.length === 0) {
        console.log("Wrong. Please add option!");
        return false;
    }
    if (myArgs.length > 4) {
        console.log("Wrong. Maximum is 3/4 optionals");
        return false;
    }
    if (!_context.includes(".")) {
        console.log("Wrong. File context not correct format!");
        return false;
    }
    if (_context === "./") {
        console.log("Wrong. File context not correct format!");
        return false;
    }
    return true;
}



const handleInputCommand = (arg) => {
    const context = arg[0]
    if (!validContext(context)) {
        process.exit(0)
    }
    if (context === ".") {
        return;
    }
    if (!fs.existsSync(context)) {
        fs.mkdirSync(context);
        return;
    }
}

const listOptionType = ["images", "texts", "bash", "others"]

const checkOptionType = (prog) => {
    const options = prog.opts();
    if (options.type === undefined) {
        console.log("Option --type argument was missing");
    }
    else {
        const listType = options.type.split(",")
        if (!listType.every(substring => listOptionType.includes(substring))) {
            console.log("Category file is within ['images', 'texts', 'bash', 'others']");
        }
    }
}

module.exports = {
    handleInputCommand: handleInputCommand,
    checkOptionType: checkOptionType
}