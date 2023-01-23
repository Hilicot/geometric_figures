const express = require("express")
const path = require("path")
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/index.html");
  }, 100);
});
var app = express()

app.use(connectLiveReload());
app.use(express.static(path.join(__dirname, "static_js")));

app.get("/", function (request, response) {
    response.sendFile("./static_js/index.html", { root: __dirname })
})
app.listen(10000, function () {
    console.log("Started application on port %d", 10000)
});