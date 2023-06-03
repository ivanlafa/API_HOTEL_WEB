import React from 'react'
import { Formik, Form, Field } from "formik";
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

const schema = Yup.object().shape({
    // codigo: Yup.codigo()
    //     .required('Required'),
    nombre_cliente: Yup.string()
        .required('Required'),
    telefono_cliente: Yup.string()
        .required('Required'),
    fecha_reserva: Yup.date()
        .required('Required'),
    fecha_entrada: Yup.date()
        .required('Required'),
    fecha_salida: Yup.date()
        .required('Required'),
  });

export const ModalReservas = ({initialValues, showModal, setShowModal}) => {

    const queryClient = useQueryClient();

    const createBooking = useMutation((data) => {
        delete data['codigo']
        axiosInstance.post(`http://localhost:3001/bookings/`, data).
        then(response => {  
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["bookings"])
            console.log("Refrezcar");
            closeModal()
            alert('Reserva creada correctamente!')
        })
        .catch(error => {
            alert(error.response.data.sqlMessage)
        })
    });

    const updateBooking = useMutation((data) => {
        const newData = {...data}
        delete newData['codigo']

        axiosInstance.patch(`http://localhost:3001/bookings/${data.codigo}`, newData).
        then(response => {
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["bookings"])
            closeModal()
            alert('Reserva actualizada correctamente!')
        })
        .catch(error => {
            alert(error.response.data.sqlMessage)
        })
    });

    const deleteBooking = useMutation((data) => {
        const newData = {...data}
        delete newData['codigo']

        axiosInstance.delete(`http://localhost:3001/bookings/${data.codigo}`, newData).
        then(response => {
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["bookings"])
            closeModal()
            alert('Reserva Eliminada correctamente!')
        })
        .catch(error => {
            alert(error.response.data.sqlMessage)
        })
    });

    const closeModal = () => {
        setShowModal(false)
    }

  return (
    <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
        <Modal.Title>
            {initialValues.codigo === 0 ? 'Crear' : 'Actualizar'} Reserva
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
                if (initialValues.codigo == 0) {
                    createBooking.mutate(values)
                } else {
                    updateBooking.mutate(values)
                }
            }}
        >
            <Form id="form">
                <Field placeholder="Codigo Habitación" type="text" id="codigo_habitacion" name="codigo_habitacion" />
                <Field placeholder="Nombre Cliente" type="text" id="nombre_cliente" name="nombre_cliente" />
                <Field placeholder="Teléfono Cliente" type="text" id="telefono_cliente" name="telefono_cliente" />

                <label htmlFor="fechaReservacion">Fecha Reserva:</label>
                <Field placeholder="Fecha Reserva" type="date" id="fecha_reserva" name="fecha_reserva" />

                <label htmlFor="fechaEntrada">Fecha Entrada:</label>
                <Field type="date" id="fecha_entrada" name="fecha_entrada" />

                <label htmlFor="fechaSalida">Fecha Salida:</label>
                <Field type="date" id="fecha_salida" name="fecha_salida" />
            </Form>
        </Formik>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        <Button form="form" type='submit' variant="primary">
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
