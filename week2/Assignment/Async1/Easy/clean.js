const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error("Error while reading", err);
    return;
  }

  // Split by lines first
  const lines = data.split('\n');

  // Process each line to remove extra spaces
  const cleanedLines = lines.map(line => {
    // Replace multiple spaces/tabs with a single space, and trim edges
    return line.replace(/\s+/g, ' ').trim();
  });

  // Join lines back with newline character
  const cleanData = cleanedLines.join('\n');

  fs.writeFile('output.txt', cleanData + '\n', (err) => {
    if (err) {
      console.error('Error writing to output file:', err);
    } else {
      console.log('Data written successfully with lines maintained!');
    }
  });
});
