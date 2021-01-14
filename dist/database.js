"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var dbConnection = /** @class */ (function () {
    function dbConnection() {
        this.conexion = mysql_1.default.createConnection({
            host: process.env.HOST_DB,
            user: "root",
            password: process.env.PASS_DB,
            database: process.env.NAME_DB
        });
        this.conexion.connect(function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log("DB is connected");
            }
        });
    }
    dbConnection.prototype.connect = function () {
    };
    return dbConnection;
}());
var clasDbConnection = new dbConnection();
exports.default = clasDbConnection;
