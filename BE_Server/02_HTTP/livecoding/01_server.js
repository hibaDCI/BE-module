const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url == '/users'){
        console.log('request arrived to the server');
        res.write('Here is the list of users')
    }

    if (req.url == '/'){
        console.log('Welcome to my Server!')
        res.write('Welcome!')
    }

    //send a request to randomuser api and fetch data

    //send a response
    // res.write("Response message!")
    res.end()
});

server.listen(6000, ()=>console.log('Server is up on port 6000'))