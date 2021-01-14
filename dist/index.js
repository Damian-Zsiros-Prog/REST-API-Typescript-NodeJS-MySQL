"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
// Using class Server
var server = new server_1.Server();
exports.default = server.conexion;
server.start();
