import fetch from 'node-fetch'

fetch("https://randomuser.me/api/?result=1")
    .then(res => res.json())
    .then(jsonRes => console.log(jsonRes))
    .catch(err=> console.log(err.message))