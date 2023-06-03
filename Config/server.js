const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");

// Esta clase se utiliza para poder genear un object del Server
// Tener una configuracion mas limpia

class Server {

    constructor() {

        this.app = express();
        this.middleware();
        this.port = PORT;

        this.rooms = "/rooms";
        this.booking = "/bookings";
        this.auth = "/auth";

        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(morgan("tiny"));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.rooms, require("../Routes/Rooms"));
        this.app.use(this.booking, require("../Routes/Booking"));
        this.app.use(this.auth, require("../Routes/Auth"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el Puerto:: ${this.port}`);
        });
    }
}

module.exports = Server;