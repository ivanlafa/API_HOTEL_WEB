const { Router } = require("express");
const { rooms, roomsId, room, roomUpdate, roomDelete  } = require("./../Controllers/Rooms");
const { validateToken } = require("./../utils/validatetoken");

const router = new Router();

// [GET] Muestra todas las habitaciones
router.get("/", validateToken, rooms);

// [GET] Muestra una habitacion por el codigo
router.get("/:codigo", validateToken, roomsId);

// [POST] Crear una habitacion
router.post("/", validateToken, room);

// [PATCH] Actualizar habitacion
router.patch("/:codigo", validateToken, roomUpdate);

// [DELETE] Eliminar de manera logica la habitacion
router.delete("/:codigo", validateToken, roomDelete);

module.exports = router