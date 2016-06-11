"use strict";

class InvalidPortBindException extends Error {
    constructor(port) {
        super(`Invalid port bound: ${port}`);
        this.name = "InvalidPortBindException";
    }
}

module.exports = InvalidPortBindException;