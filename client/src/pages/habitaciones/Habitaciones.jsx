import React, { useState } from 'react'
import Frmtablehabi from './Frmtablehabi'
import Button from 'react-bootstrap/Button';

import { Navigate } from 'react-router-dom';
import { ModalHabitaciones } from './ModalHabitaciones';

import { useQuery } from 'react-query';
import axiosInstance from '../../api/axiosInstance';

const defaultValues = {
  codigo: 0,
  numero:'',
  tipo:'',
  valor:''
}

const Habitaciones = () => {
  
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [habitacionValues, setHabitacionValues] = useState(defaultValues);
  
  const { isLoading, error, data } = useQuery('data', () =>
    axiosInstance.get('http://localhost:3001/rooms').then((response) => response.data.habitaciones)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Button className='mb-2' 
      onClick={() => {
          setHabitacionValues(defaultValues);
          setShowAddUpdateModal(true);
        }}>Crear habitaciones</Button>

      <Frmtablehabi setHabitacionValues={setHabitacionValues} setShowModal={setShowAddUpdateModal} data={data}/>

      <ModalHabitaciones initialValues={habitacionValues} showModal={showAddUpdateModal} setShowModal={setShowAddUpdateModal}/>


  </div>
  )
}

export default Habitaciones
