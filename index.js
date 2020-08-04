const bodyParser = require('body-parser');
const http = require("http");
const express = require("express");
const server = http.createServer();
const app = express();
app.use(bodyParser.json());

app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));
app.get("/", (req,res) => res.sendFile(__dirname + "/index.html"));
//app.post("/tagbatch", (req,res) => console.log("teste"));
app.listen(3000,() => console.log("Listening on port 3000"));


// GET method route
app.get('/', function (req, res) {
  res.send('Pegou as tag');
});

// POST method route
app.post('/lampada', function (req, res) {
  console.log(req.body);
  res.json(toggleLights(req.body));
  res.send("Deu certo");
  });

function toggleLights (payload) {
  const options = {
    hostname: '192.168.15.249',
    port: 8083,
    path: '/tagbatch',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })
  req.on('error', (error) => {
    console.error(error)
  })
  const data = JSON.stringify({ 'setTags': payload });
  console.log(data);
  req.write(data);
  req.end();
  }
/*
const data = JSON.stringify({
	"setTags":
	[{"name": "Application_Andar_3_IN_Iluminacao_3pav_Circuito3", "value": "false"}]
})
*/