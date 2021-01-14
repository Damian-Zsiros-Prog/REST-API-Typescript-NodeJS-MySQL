"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var places_routes_1 = __importDefault(require("./routes/places.routes"));
var mysql_1 = __importDefault(require("mysql"));
// Importando variables de entorno
dotenv.config();
var Server = /** @class */ (function () {
    function Server() {
        this.conexion = mysql_1.default.createConnection({});
        this.app = express_1.default();
        this.config();
        this.middlewares();
        this.connectDB();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set("port", process.env.PORT || 4000);
    };
    Server.prototype.connectDB = function () {
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
    };
    Server.prototype.middlewares = function () {
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use(places_routes_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("Server on port", _this.app.get("port"));
        });
    };
    return Server;
}());
exports.Server = Server;
