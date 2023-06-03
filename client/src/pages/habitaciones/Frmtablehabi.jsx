import React, { useState } from 'react';
import {useMutation} from 'react-query'
import axiosInstance from '../../api/axiosInstance'

const Frmtablehabi = ({ setHabitacionValues, setShowModal, data }) => {

  const [filteredData, setFilteredData] = useState(data);

  const deleteHabitacion = async (codigo)=>{
    await axiosInstance.delete(`http://localhost:3001/rooms/${codigo}`)
  }

  const mutationDeleteHabitacion = useMutation(deleteHabitacion,{
    onSucces: ()=>{

    }
  })
  const handleDelete = (codigo) => {
    mutationDeleteHabitacion.mutate(codigo)
  };
  

  const handleUpdate = (codigo) => {
    setHabitacionValues(filteredData.find((el) => el.codigo === codigo));
    setShowModal(true);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ codigo, numero, tipo, valor }) => (
            <tr key={codigo}>
              <td>{codigo}</td>
              <td>{numero}</td>
              <td>{tipo}</td>
              <td>{valor}</td>
              <td>
                <button className='btn bg-info m-lg-3' onClick={() => handleUpdate(codigo)}>Actualizar</button>
                <button className='btn bg-danger m-lg-3' onClick={() => handleDelete(codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Frmtablehabi;
