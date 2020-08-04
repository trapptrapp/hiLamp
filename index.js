const bodyParser = require('body-parser');
const http = require("http");
const express = require("express");
const server = http.createServer();
const app = express();
app.use(bodyParser.json());

app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));
app.get("/", (req,res) => res.sendFile(__dirname + "/index.html"));
app.post("/tagbatch", (req,res) => console.log("teste"));
app.listen(3000,() => console.log("Listening on port 3000"));


// GET method route
app.get('/', function (req, res) {
  res.send('Pegou as tag');
});

// POST method route
app.post('/lampada', function (req, res) {
  res.json({requestBody: req.body});
  console.log(req.body);
});



/*
function postLampada(dados) {
  
  var jdata = new Object();
  jdata.level = levelVal; // level is key and levelVal is value
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/lampada", true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  xhttp.send(JSON.stringify(dados));
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
  }
  }
/*
const data = JSON.stringify({
	"setTags":
	[{"name": "Application_Andar_3_IN_Iluminacao_3pav_Circuito3", "value": "false"}]
})
const options = {
  hostname: '192.168.15.249',
  port: 8083,
  path: '/tagbatch',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
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
req.write(data)
req.end()
*/