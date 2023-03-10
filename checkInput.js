const fs = require('fs')
const path = require('path');
const util = require("util");
var myArgs = process.argv.slice(2);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const exists = util.promisify(fs.exists);
const validContext = (_context) => {
    if (myArgs.length === 0) {
        console.log("!! Wrong. Please add option!");
        return false;
    }
    if (!_context.includes(".")) {
        console.log("!! Wrong. File context not correct format!");
        return false;
    }
    return true;
}



const handleInputCommand = async (arg) => {
    const context = arg[0];

    if (!validContext(context)) {
        process.exit(0);
    }

    const countDotInDir = context.split(".").length - 1 > 1;
    if (countDotInDir) {
        console.log("!! Format file context wrong!");
        process.exit(0);
    }

    if (context === ".") {
        return;
    }

    if (!context.includes("./")) {
        console.log("!! Format file context wrong!");
        process.exit(0);
    }


};

const listOptionType = ["images", "texts", "bash", "others"]
const listOption = ["--type", "--size", "--name", "--modify"]
const checkOptionType = async (prog) => {
    const options = prog.opts();
    if (myArgs.includes("--type")) {
        if (!options.type) {
            console.log("!! Option --type argument was missing");
            process.exit(0)
        } else {
            let argTemp = process.argv.slice(3)
            const indexValueType = argTemp.indexOf(options.type)
            if (indexValueType !== -1) {
                argTemp.splice(indexValueType, 1);
            }

            if (!argTemp.every(substring => listOption.includes(substring))) {
                console.log("!! One or more options are wrong!");
                process.exit(0)
            }
            if (myArgs.length > 5) {
                console.log("!! Wrong. Maximum is 3/4 optionals");
                process.exit(0)
            }
            const listType = options.type.split(",").map(item => item.trim());
            if (!listType.every(substring => listOptionType.includes(substring))) {
                console.log("!! Category file is within ['images', 'texts', 'bash', 'others']");
                process.exit(0)
            }
        }
    }
    
    const dirExists = await exists(myArgs[0]);
    if (!dirExists) {
        const dir = path.join(__dirname, myArgs[0]);
        try {
            await mkdir(dir, { recursive: true });
            const files = await readdir(__dirname);
        } catch (err) {
            process.exit(0)
        }
    }

}

module.exports = {
    handleInputCommand: handleInputCommand,
    checkOptionType: checkOptionType
}