import request from 'request';

request("https://randomuser.me/api", (error, response, body) => {
  if (error) {
    console.log(error.message);
    return;
  }

    console.log(response)
  console.log(JSON.parse(body));
});