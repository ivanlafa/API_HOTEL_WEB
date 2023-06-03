const Server = require("./Config/server");
const { pool } = require("./Config/db");
//linea agregada

const SERVER = new Server();

// Esto es para validar la conexion a la base de datos
pool.connect((err) => {
    if (err) {
        // Si existe un error no arranca el aplicativo.
        console.log("Error no se puede conectar")
        process.exit(0);
    } else {
        // Si tdo esta bien response la operacaion y se activa el API
        console.log("Se conecto a la base de datos")
        pool.query("SELECT 1+1", function (err, rows) {
            if (err) {
                console.log(err)
            }
            console.log(rows);
        });
        SERVER.listen();
    }
});
