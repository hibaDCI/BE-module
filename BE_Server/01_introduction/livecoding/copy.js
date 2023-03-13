//copy program
const fs = require('fs').promises;

let source = process.argv.slice(2)[0]       //process.argv.slice(2)   ['log.txt', 'log_copy.txt']
let target = process.argv.slice(2)[1]

//step1. read the source file
fs.readFile(source, 'utf-8')
    .then((data) => { 
        //data is available
        //step2. write the readed content into target file
        fs.writeFile(target, data)
            .then(() => { 
                console.log('The source file copied successfully!');
            })
            .catch((err) => { 
                console.log(err.message);
             })
     })
    .catch((err) => { 
        console.log(err.message)
    })