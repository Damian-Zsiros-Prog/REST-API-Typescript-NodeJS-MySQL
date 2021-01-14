"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var places_controller_1 = __importDefault(require("../controllers/places.controller"));
var placesRoutes = /** @class */ (function () {
    function placesRoutes() {
        this.router = express_1.Router();
        this.routes();
    }
    placesRoutes.prototype.routes = function () {
        this.router.get("/", function (req, res) {
            res.redirect("/places");
        });
        this.router.get("/places", function (req, res) {
            var placecontroller = new places_controller_1.default(req, res);
            placecontroller.getAllPlaces();
        });
        this.router.get("/place/:id", function (req, res) {
            var id = req.params.id;
            var placecontroller = new places_controller_1.default(req, res);
            placecontroller.getPlace(id);
        });
        this.router.post("/places", function (req, res) {
            var _a = req.body, name = _a.name, direccion = _a.direccion;
            var placecontroller = new places_controller_1.default(req, res);
            placecontroller.createPlace(name, direccion);
        });
        this.router.put("/place/:id", function (req, res) {
            var id = req.params.id;
            var _a = req.body, name = _a.name, direccion = _a.direccion;
            var placecontroller = new places_controller_1.default(req, res);
            placecontroller.updatePlace(id, name, direccion);
        });
        this.router.delete("/place/:id", function (req, res) {
            var id = req.params.id;
            var placecontroller = new places_controller_1.default(req, res);
            placecontroller.deletePlace(id);
        });
    };
    return placesRoutes;
}());
var router = new placesRoutes();
exports.default = router.router;
