// console.log('Hello world backend!')
// console.log(process.pid)    //pid return the process id
// console.log(process.argv)   //argv return an array of arguments passing to execution command
// console.log(process.argv.slice(2))

// let i =0
// while (i < 1000) {
//     console.log('i =', i);
//     if (i === 10) {
//         process.exit()  //stop the execution of nodejs program
//     }
    
//     i++
// }

let name = process.argv.slice(2)[0]; //['Fahim']
console.log(`Welcome to my server app ${name}`);
