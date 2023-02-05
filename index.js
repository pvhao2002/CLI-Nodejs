const fs = require('fs')
const path = require('path');
const { Command } = require("commander");
const program = new Command();
var myArgs = process.argv.slice(2);

const CheckValidInput = require('./checkInput');


program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("--type, --type <value>", "handle file type")
    .option("--size, --size", "handle file size")
    .option("--modify, --modify", "handle file modification time")
    .option("--name, --name", "handle file name")
    .action(() => {
        CheckValidInput.handleInputCommand(myArgs);
        CheckValidInput.checkOptionType(program)
    })
    .parse(process.argv)