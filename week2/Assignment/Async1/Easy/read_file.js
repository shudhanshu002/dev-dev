// const fs = require('fs');

// const data = fs.readFileSync('f1.txt','utf-8');
// console.log(data);

const fs = require("fs");
//Async(non-blocking)
fs.readFile('f1.txt','utf-8',(err,data) => {
    if(err) {
        console.error("Error reading file:" , err);
        return;
    }
    console.log("file contents:",data);
})