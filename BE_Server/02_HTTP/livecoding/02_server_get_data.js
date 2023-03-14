const http = require("http");

const options = {
  hostname: "localhost",
  port: 6000,
  path: "/",
  method: "GET",
};

//create my server
const server = http.createServer((req, res) => {
  if (req.url == "/users") {
    //send request to another server (API server)
    const apiReq = http.request(options, (apiRes) => {
    //const apiReq = http.get("http://localhost:6000/", (apiRes) => {
      apiRes.on("data", (chunk) => {
          console.log("******");
          console.log(`Received ${chunk.length} bytes of data.`);
          console.log("Data:",chunk.toString());
        });
        
      apiRes.on("end", () => {
            console.log("Request completed.");
            console.log("******");
      });

      apiRes.on("error", () => {
        console.log(`Got error: ${error.message}`);
      });
    });

    apiReq.end();
  }

  if (req.url == "/") {
    console.log("Welcome to my Server!");
    res.write("Welcome!");
  }

  //send a request to randomuser api and fetch data

  //send a response
  // res.write("Response message!")
  res.end();
});

server.listen(5000, () => console.log("Server is up on port 5000"));
