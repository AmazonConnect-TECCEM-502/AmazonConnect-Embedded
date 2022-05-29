var http = require("http");
var https = require("https");

var fs = require("fs");
var privateKey = fs.readFileSync("sslcert/privatekey.pem", "utf8");
var certificate = fs.readFileSync("sslcert/server.crt", "utf8");
var credentials = {
	key: privateKey,
	cert: certificate
};

var express = require("express");
var app = express();
app.use(express.static(__dirname));

app.get("/", (req, res) => {
	res.sendFile("public/index.html", {root: __dirname });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, ()=> console.log("HTTP server running on PORT 8080"));
httpsServer.listen(8443, ()=> console.log("HTTPS server running on PORT 8443"));
