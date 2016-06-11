"use strict";

const dgram = require("dgram");

const InvalidPortBindException = require("./exception/InvalidPortBindException");

class Server {
    constructor(port) {
        if (!checkPort(port)) throw new InvalidPortBindException(port);

        this.nativeServer = dgram.createSocket("udp4");

        this.nativeServer.on("error", error => {
            console.log(`Error stacktrace: ${error.stack}`);
            this.nativeServer.close();
        });

        this.nativeServer.on("message", (message, remote) => {
            console.log(`Bytes from ${remote.address}:${remote.port}`);
            var echoBuffer = new Buffer("TEST HELLO WORLD");
            this.nativeServer.send(echoBuffer, 0, echoBuffer.length, remote.port, remote.address, (error, bytes) => {
                if (error) {
                    this.nativeServer.emit("error", error);
                    return;
                }

                console.log(`ECHO sent: ${bytes}`);
            });
        });

        this.nativeServer.on("listening", () => {
            var addressInfo = this.nativeServer.address();
            console.log(`Server bound at ${addressInfo.address}:${addressInfo.port}`);
        });

        this.nativeServer.bind(port);
    }
}

function checkPort(port) {
    return (port != null) &&
        (port.constructor === Number) &&
        (port === parseInt(port)) &&
        (port >= 1 && port <= 65535);
}

module.exports = Server;