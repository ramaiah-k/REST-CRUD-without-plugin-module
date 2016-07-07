var serverConfig = require("../config").serverConfig;

var http = require("http");
var reqHandler = require("./requestHandler");

var server = http.createServer(function(req, res) {
    console.log(req.method);
    console.log(req.url);
    switch (req.method) {
        case "GET":
            reqHandler.get(req, res);
            break;
        case "POST":
            reqHandler.post(req, res);
            break;
        case "PUT":
            reqHandler.put(req, res);
            break;
        case "DELETE":
            reqHandler.del(req, res);
            break;
            //     default:
            //         httpMsgs.show405(req, resp);
            //         break;
    }
});

server.listen(serverConfig.port, function() {
    console.log("Started listening at: " + serverConfig.port);
});
