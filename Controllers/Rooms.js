const { request, response } = require("express");
const { pool } = require("./../Config/db");
const { queryrooms, queryroomId, createRoom, updateRoom, deleteRoomn } = require("./../utils/queries");

// Controlador que muestras todas las habitaciones
const rooms = (req = request, res = response) => {
    try {
        data = pool.query(queryrooms, (err, results, fields) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ "habitaciones": results });
        });

    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
}

// Controlador que muestra una habitacion por su codigo
const roomsId = (req = request, res = response) => {
    try {
        let codigo = req.params.codigo;
        const data = pool.query(queryroomId(codigo), function (err, results, fields) {
            if (err) {
                return res.status(500).json(err);
            }
            //console.log(data._rows[0][0]);
            return res.status(200).json({ "habitacion": results[0] });
        });

    } catch (error) {
        return res.status(500).json({
            error: error.toString()
        });
    }
}

// Guarda la habitacion
const room = (req = request, res = response) => {
    try {
        const data = req.body;
        pool.execute(createRoom, [data.numero, data.tipo, data.valor], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ "msg": `Se creó la habitación con el codigo #${result.insertId}` });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Actualiza la habitacion
const roomUpdate = (req = request, res = response,) => {
    try {
        let codigo = req.params.codigo;
        const dataUpdate = req.body;
        console.log(dataUpdate)
        const values = [dataUpdate.numero, dataUpdate.tipo, dataUpdate.valor, codigo];
        pool.execute(updateRoom, values, (err, result) => {
            if (err) {
                return res.status(500).json(err)
            }
            console.log(result);
            return res.status(200).json({ "msg": `Actualizado correctamente` })
        });
    } catch (error) {
        return res.status(500).json(error)
    }
}

// Elimina la reserva
const roomDelete  = (req = request, res = response) => {
    try {
        let codigo = req.params.codigo
        // Este realiza un soft delete, cambia el paramtro del eleminada en la tabla mas no borra el registo.
        pool.query(deleteRoomn(codigo), (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({
                "msg": `${result.affectedRows} registro(s) eliminado`
            });
        })

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    rooms,
    roomsId,
    room,
    roomUpdate,
    roomDelete,
}