const fs = require('fs');

fs.readFile('input.txt','utf-8',(err,data) => {
    if(err) {
        console.error("errorr reading file",err);
        return;
    }

    const wordToRemove = 'awara';
    const cleanData = data
        .split(/\s+/)
        .filter(word => word!=wordToRemove)
        .join(' ');

    fs.appendFile('output.txt',cleanData+'\n',(err)=>{
        if (err) {
            console.error('Error writing to output file:', err);
        } else {
            console.log('Data written successfully (excluding "' + wordToRemove + '").');
        }
    });
});