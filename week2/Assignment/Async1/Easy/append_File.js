fs.appendFileSync('output.txt', '\nThis is appended text.');

//Async

fs.appendFile('output.txt', '\nMore appended text.', (err) => {
    if (err) throw err;
    console.log('Data appended!');
});


//Delete file
fs.unlink('output.txt', (err) => {
    if (err) throw err;
    console.log('File deleted');
});
