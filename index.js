var axios = require('axios');
const bodyParser = require("body-parser");
const http = require("http");
const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

const serverURL = 'http://192.168.15.249:8083'
let currentCookie = ''

app.listen(3000, () => console.log("Listening on port 3000"));

// GET method route
app.get('/', function (req, res) {
  res.send('Pegou as tag');
});

app.post('/lampada', async (req, res) => {
  try {
    await setLightStatus(req.body);
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, e });
  }
});

app.post('/lampada/getStatus', async (req, res) => {
  try {
    const response = await getLightStatus(req.body);
    res.status(200).json({ ok: true, data: response });
  } catch (e) {
    res.status(500).json({ ok: false, e });
  }
})

async function setLightStatus(data) {
  try {
    let payload = { setTags: data }
    const response = await axios.post(`${serverURL}/tagbatch`,
      payload,
      {
        withCredentials: true
      }
    )
    console.log(response)
    setCurrentCookie(response.headers)
  } catch (e) {
    console.log(e.message)
  }
}

async function getLightStatus(data) {
  try {
    let payload = { getTags: data }
    const response = await axios.post(`${serverURL}/tagbatch`,
      payload,
      {
        withCredentials: true,
        headers: { Cookie: currentCookie }
      }
    )

    console.log(response)
    setCurrentCookie(response.headers)
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}

function composeHeader() {
  let header = { withCredentials: true }
  if (currentCookie) {
    header = {
      ...header,
      headers: { Cookie: currentCookie }
    }
  }
  return header
}

function setCurrentCookie(headers) {
  console.log(headers)
  console.log(headers['set-cookie'])
  if (headers['set-cookie']) { 
    currentCookie = headers['set-cookie']
  }
}