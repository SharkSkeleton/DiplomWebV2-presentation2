const express = require("express");
const app = express();
const jsonParser = express.json();


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();
});
// authentication
app.post("/project/execute", jsonParser, function (request, response) {

  if(!request.body) return response.sendStatus(400);
  console.log(request);
  response.json({msg: "HelloPost"});
});

app.listen(8080);
