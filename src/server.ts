import express from 'express';
import * as dotenv from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import router from './routes/places.routes';
import mysql from 'mysql';


// Importando variables de entorno
dotenv.config();

export class Server {
    app: express.Application;
    conexion: mysql.Connection;

    constructor() {
        this.conexion = mysql.createConnection({});
        this.app = express();
        this.config();
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    config() {
        this.app.set("port", process.env.PORT || 4000);
    }

    connectDB() {
        this.conexion = mysql.createConnection({
            host: process.env.HOST_DB,
            user: "root",
            password: process.env.PASS_DB,
            database: process.env.NAME_DB
        });
        this.conexion.connect((err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("DB is connected");
            }
        });
    }

    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.app.use(router)
    }

    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}