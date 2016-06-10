"use strict";

const dgram = require("dgram");

class Server {
    constructor() {
        var _server = dgram.createSocket("udp4");

        _server.on("listening", () => {
            var addressInfo = _server.address();
            console.log(`Server binded at ${addressInfo.address}:${addressInfo.port}`);
        });

        _server.bind(19132);
    }
}

module.exports = Server;