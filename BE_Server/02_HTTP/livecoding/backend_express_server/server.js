import express from 'express';

//create a server
const app = express()
app.use(express.json())

//route 

//GET http://localhost:5000/    path: /
app.get('/', (req, res) => {
    //send back res
    res.send('Hello world Express!')
});

//GET http://localhost:5000/users
app.get('/users', (req, res) => {
    let users = ['Ernesto', 'Mary', 'Mercy', 'Dejan'];
    res.send(users)
});

//POST http://localhost:5000/login
app.post('/login', (req, res) => { 
    let user = {username: 'fahim', pass: '123'}
    //authentication
    if (user.username === req.body.uname && user.pass === req.body.password) {
        res.send("Welcome to the app!")
    } else {
        res.send("Username or password not matched!")
    }
 })



//define the port number for the server
const port = 5000;
app.listen(port, () => { console.log('Server is up on port:', port); })