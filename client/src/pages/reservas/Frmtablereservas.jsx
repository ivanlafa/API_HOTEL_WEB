import {React,useState} from 'react';
import {useMutation} from 'react-query'
import axiosInstance from '../../api/axiosInstance'

const Frmtablereservas = ({ setReservaValues, setShowModal, data }) => {

  const [filteredData, setFilteredData] = useState(data);

  const deleteReserva = async (codigo)=>{
    await axiosInstance.delete(`http://localhost:3001/bookings/${codigo}`)
  }

  const mutationDeleteReserva = useMutation(deleteReserva,{
    onSucces: ()=>{

    }
  })
  const handleDelete = (codigo) => {
    mutationDeleteReserva.mutate(codigo)
  };
  

  const handleUpdate = (codigo) => {
    setReservaValues(filteredData.find((el) => el.codigo === codigo));
    setShowModal(true);
  };


  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Codigo Hab</th>
            <th>Nombre Cliente</th>
            <th>Tel Cliente</th>
            <th>Fecha Reserva</th>
            <th>Fecha Entrada</th>
            <th>Fecha Salida</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ codigo, codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reserva, fecha_entrada, fecha_salida }) => (
            <tr key={codigo}>
              <td>{codigo}</td>
              <td>{codigo_habitacion}</td>
              <td>{nombre_cliente}</td>
              <td>{telefono_cliente}</td>
              <td>{fecha_reserva}</td>
              <td>{fecha_entrada}</td>
              <td>{fecha_salida}</td>
              <td>
                <button className='btn bg-info  m-lg-3' onClick={() => handleUpdate(codigo)}>Actualizar</button>
                <button className='btn bg-danger m-lg-3' onClick={() => handleDelete(codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Frmtablereservas;
