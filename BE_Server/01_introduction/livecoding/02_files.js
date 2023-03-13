const fs = require('fs').promises;

//create a file and write a message into it
fs.writeFile('log.txt', 'This is the first log message!', { encoding: 'utf-8' })
    .then(() => {
        console.log('File is created. The text is written there.');
    })
    .catch((err) => {
        console.log(err.message)
    });



//read the file
// fs.readFile('log.txt', 'utf-8')
//     .then((text) => {
//         console.log(text);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

let fileName = process.argv.slice(2)[0]
fs.readFile(fileName, 'utf-8')
    .then((text) => {
        console.log(text);
    })
    .catch((err) => {
        console.log(err.message);
    });
