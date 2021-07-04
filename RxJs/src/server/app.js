const express = require("express");
const app = express();
const port = 4000;

app.get('/', (request, response) => {
    response.send("hello world RWA");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })