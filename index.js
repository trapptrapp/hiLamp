const http = require("http");
const express = require("express");
const serrver = http.createServer();
const app = express();

app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));
app.get("/", (req,res) => res.sendFile(__dirname + "/index.html"));
app.post("/tagbatch", (req,res) => console.log("teste"));
app.listen(3000, () => console.log("Listening on port 3000"));
