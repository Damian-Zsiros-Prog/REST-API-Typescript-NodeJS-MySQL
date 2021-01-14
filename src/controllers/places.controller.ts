import dbConnection from '../index';
import mysql from 'mysql';

export default class PlaceController {
    request: any
    response: any
    constructor(req: any, res: any) {
        this.request = req;
        this.response = res;
    }

    getAllPlaces() {
        dbConnection.query("SELECT * FROM places", (err, rows, fields) => {
            if (!err) {
                this.response.json({
                    places: rows
                })
            } else {
                console.error(err)
            }
        });
    }

    getPlace(id: string) {
        dbConnection.query("SELECT * FROM places WHERE id = ?", [id], (err, rows, fields) => {
            if (!err) {
                this.response.json({
                    place: rows
                })
            } else {
                console.error(err)
            }
        });
    }


    createPlace(name: String, direccion: String) {
        dbConnection.query("INSERT INTO places (nombre,direccion) VALUES(?,?)", [name, direccion], (err, rows, fields) => {
            if (!err) {
                this.response.json({
                    message: "Place saved"
                })
            } else {
                this.response.json({
                    message: "Error at save"
                })
                console.error(err)
            }
        });
    }

    deletePlace(id: String) {

        dbConnection.query("DELETE FROM places WHERE id=?", [id], (err, rows, fields) => {
            if (!err) {
                this.response.json({
                    message: "Place deleted"
                })
            } else {
                this.response.json({
                    message: "Error at delete"
                })
                console.error(err)
            }
        });
    }

    updatePlace(id: String, name: String, direccion: String) {

        dbConnection.query("UPDATE places SET nombre=?,direccion=? WHERE id=?", [name,direccion,id], (err, rows, fields) => {
            if (!err) {
                this.response.json({
                    message: "Place updated"
                })
            } else {
                this.response.json({
                    message: "Error at update"
                })
                console.error(err)
            }
        });
    }
}