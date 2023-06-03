
const { Router } = require("express");

const { reservas, reserva, actualizarReserva, eliminarReserva } = require("./../Controllers/Booking.js");
const { validateToken } = require("./../utils/validatetoken.js");

const router = Router();

//[GET] Muestra todas las reservas
router.get("/", validateToken, reservas);

// [POST] Crear un reserva
router.post("/", validateToken, reserva);

// [PATCH] actualiza una reserva
router.patch("/:codigo", validateToken, actualizarReserva);

// [DELETE] eliminar la reserva
router.delete("/:codigo", validateToken, eliminarReserva);

module.exports = router;

