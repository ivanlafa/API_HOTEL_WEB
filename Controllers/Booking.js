const { request, response } = require("express");
const { pool } = require("./../Config/db");
const { booking, createbooking, updatebooking, deletebooking } = require("./../utils/queries");

// Muestra todas las reservas que no esten eliminadas
const reservas = (req = request, res = response) => {
    try {
        data = pool.query(booking, (err, results, fields) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ "reservas": results });
        });

    } catch (error) {
        return res.status(500).json(error);
    }
}

// Guarda la reservas
const reserva = (req = request, res = response) => {
    try {
        const data = req.body;
        pool.execute(createbooking, [data.codigo_habitacion, data.nombre_cliente, data.telefono_cliente, data.fecha_reserva, data.fecha_entrada, data.fecha_salida], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json({ "msg": `Se realizo la reserva con el codigo #${result.insertId}` });
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Actualiza la reserva
const actualizarReserva = (req = request, res = response,) => {
    try {
        let codigo = req.params.codigo;
        const dataUpdate = req.body;
        const sql = updatebooking;
        console.log(dataUpdate)
        const values = [dataUpdate.codigo_habitacion, dataUpdate.nombre_cliente, dataUpdate.telefono_cliente, dataUpdate.fecha_reserva, dataUpdate.fecha_entrada, dataUpdate.fecha_salida, codigo];
        pool.execute(sql, values, (err, result) => {
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
const eliminarReserva = (req = request, res = response) => {
    try {
        let codigo = req.params.codigo
        console.log(codigo)
        // Este realiza un soft delete, cambia el paramtro del eleminada en la tabla mas no borra el registo.
        pool.query(deletebooking(codigo), (err, result) => {
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
    reservas,
    reserva,
    actualizarReserva,
    eliminarReserva,
}
