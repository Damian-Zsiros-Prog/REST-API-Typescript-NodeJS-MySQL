"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var PlaceController = /** @class */ (function () {
    function PlaceController(req, res) {
        this.request = req;
        this.response = res;
    }
    PlaceController.prototype.getAllPlaces = function () {
        var _this = this;
        index_1.default.query("SELECT * FROM places", function (err, rows, fields) {
            if (!err) {
                _this.response.json({
                    places: rows
                });
            }
            else {
                console.error(err);
            }
        });
    };
    PlaceController.prototype.getPlace = function (id) {
        var _this = this;
        index_1.default.query("SELECT * FROM places WHERE id = ?", [id], function (err, rows, fields) {
            if (!err) {
                _this.response.json({
                    place: rows
                });
            }
            else {
                console.error(err);
            }
        });
    };
    PlaceController.prototype.createPlace = function (name, direccion) {
        var _this = this;
        index_1.default.query("INSERT INTO places (nombre,direccion) VALUES(?,?)", [name, direccion], function (err, rows, fields) {
            if (!err) {
                _this.response.json({
                    message: "Place saved"
                });
            }
            else {
                _this.response.json({
                    message: "Error at save"
                });
                console.error(err);
            }
        });
    };
    PlaceController.prototype.deletePlace = function (id) {
        var _this = this;
        index_1.default.query("DELETE FROM places WHERE id=?", [id], function (err, rows, fields) {
            if (!err) {
                _this.response.json({
                    message: "Place deleted"
                });
            }
            else {
                _this.response.json({
                    message: "Error at delete"
                });
                console.error(err);
            }
        });
    };
    PlaceController.prototype.updatePlace = function (id, name, direccion) {
        var _this = this;
        index_1.default.query("UPDATE places SET nombre=?,direccion=? WHERE id=?", [name, direccion, id], function (err, rows, fields) {
            if (!err) {
                _this.response.json({
                    message: "Place updated"
                });
            }
            else {
                _this.response.json({
                    message: "Error at update"
                });
                console.error(err);
            }
        });
    };
    return PlaceController;
}());
exports.default = PlaceController;
