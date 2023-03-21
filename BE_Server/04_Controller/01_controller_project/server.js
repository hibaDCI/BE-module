import express from 'express';
import {welcome} from './controllers/welcome.controller.js'

const app = express();

//define routes
app.get('/', welcome)






const port = 5000;
app.listen(port, console.log('server is up on port:', port));