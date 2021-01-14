import { Router, Request, Response } from 'express';
import mysql from 'mysql';
import dbConnection from '../index';
import placeController from '../controllers/places.controller';


class placesRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.redirect("/places")
        })
        this.router.get("/places", (req, res) => {
            var placecontroller = new placeController(req, res);
            placecontroller.getAllPlaces();
        })
        this.router.get("/place/:id", (req, res) => {
            const { id } = req.params;
            var placecontroller = new placeController(req, res);
            placecontroller.getPlace(id)
        })
        this.router.post("/places", (req, res) => {
            const { name, direccion } = req.body;
            var placecontroller = new placeController(req, res);
            placecontroller.createPlace(name, direccion);
        })
        this.router.put("/place/:id", (req, res) => {
            const { id } = req.params;
            const { name, direccion } = req.body;
            var placecontroller = new placeController(req, res);
            placecontroller.updatePlace(id, name, direccion);
        })
        this.router.delete("/place/:id", (req, res) => {
            const { id } = req.params;
            var placecontroller = new placeController(req, res);
            placecontroller.deletePlace(id);
        })
    }
}
const router = new placesRoutes();
export default router.router;