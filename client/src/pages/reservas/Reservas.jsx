import React, { useState } from 'react'
import Frmtablereservas from './Frmtablereservas'
import Button from 'react-bootstrap/Button';

import { Navigate } from 'react-router-dom';
import { ModalReservas } from './ModalReservas';

import { useQuery } from 'react-query';
import axiosInstance from '../../api/axiosInstance';

const defaultValues = {
  codigo: 0,
  codigo_habitacion: 0,
  nombre_cliente: '',
  telefono_cliente: '',
  fecha_reserva: '',
  fecha_entrada: '',
  fecha_salida: '',
}

const Reservas = () => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [reservaValues, setReservaValues] = useState(defaultValues);

  const { isLoading, error, data } = useQuery('bookings', () =>
    axiosInstance.get('http://localhost:3001/bookings/').then((response) => response.data.reservas)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Button className='mb-2' onClick={() => {
          setReservaValues(defaultValues);
          setShowAddUpdateModal(true);
        }}>Crear reserva</Button>

      <Frmtablereservas setReservaValues={setReservaValues} setShowModal={setShowAddUpdateModal} data={data}/>

      <ModalReservas initialValues={reservaValues} showModal={showAddUpdateModal} setShowModal={setShowAddUpdateModal}/>
  </div>
  )
}

export default Reservas
