#!/usr/bin/env node


const fs = require('fs');
let fordModule = require('./js/ford.js');

let output = fordModule.ford.tikZImage;

console.log(output);

let fileName = "table.tex"; 

fs.writeFile(fileName, output, function(err) {
    if(err) {
        return console.log("There was an error" + err);
        console.log("exiting");
		process.exit(1);
    }
}); 

