import axios from 'axios';

axios("https://randomuser.me/api/?result=1")
    .then(res => console.log(res.data.results))
    .catch(err => console.log(err.message))