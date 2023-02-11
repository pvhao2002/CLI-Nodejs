const fs = require('fs')
const path = require('path');
const { Command } = require("commander");
const program = new Command();
let myArgs = process.argv.slice(2);

const CheckValidInput = require('./checkInput');
const sortByType = require("./sortByType");
const sortBySize = require("./sortBySize")
const sortByName = require("./sortByName")
const sortByModify = require("./sortByModify")



program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("--type, --type <value>", "handle file type")
    .option("--size, --size", "handle file size")
    .option("--modify, --modify", "handle file modification time")
    .option("--name, --name", "handle file name")



program
    .action((options) => {
        CheckValidInput.handleInputCommand(myArgs);
    })
    .on("option:type", () => {
        CheckValidInput.checkOptionType(program);
        const fileTypeList = options.type.split(",").map(item => item.trim());
        for (const item of fileTypeList) {
            sortByType.handleFile(myArgs[0], item)
        }
    })
    .parse(process.argv)
