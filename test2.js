#!/usr/bin/env node
const program = require("commander");

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("--type, --type <value>", "handle file type")
  .option("--size, --size", "handle file size")
  .option("--modify, --modify", "handle file modification time")
  .option("--name, --name", "handle file name");

let lastOption;

program
  .action(function(options) {
    console.log("lastOption:", lastOption);
  })
  .on("option:type", function(value) {
    lastOption = "type";
    console.log("value of --type:", value);
  })
  .on("option:size", function() {
    lastOption = "size";
    console.log("--size");
  })
  .on("option:modify", function() {
    lastOption = "modify";
    console.log("--modify");
  })
  .on("option:name", function() {
    lastOption = "name";
    console.log("--name");
  });

program.parse(process.argv);
