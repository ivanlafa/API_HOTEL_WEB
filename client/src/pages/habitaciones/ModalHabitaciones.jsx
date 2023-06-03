import React from 'react'
import { Formik, Form, Field } from "formik";
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { useMutation, useQueryClient } from 'react-query';

const schema = Yup.object().shape({
    numero: Yup.string()
        .required('Required'),
    tipo: Yup.string()
        .required('Required'),
    valor: Yup.string()
        .required('Required'),
  });

export const ModalHabitaciones = ({initialValues, showModal, setShowModal}) => {

    const queryClient = useQueryClient();

    const createRoom = useMutation((data) => {
        delete data['codigo']
        axiosInstance.post(`http://localhost:3001/rooms/`, data).
        then(response => {  
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["rooms"]);
            console.log("Refrezcar");
            closeModal()
            alert('Habitacion creada correctamente!')
        })
        .catch(error => {
            alert(error.response.data.sqlMessage)
        })
    });

    // const createRoom = useMutation((data) => {
    //     delete data['codigo']
    //     axiosInstance.post(`http://localhost:3001/rooms/`, data).
    //     then(response => {  
    //         return response.data
    //     })
    //     .then(data => {
    //         queryClient.invalidateQueries(["rooms"])
    //         closeModal()
    //         alert('Habitacion creada correctamente!')
    //     })
    //     .catch(error => {
    //         alert(error.response.data.sqlMessage)
    //     })
    // });

    const updateRoom = useMutation((data) => {
        const newData = {...data}
        delete newData['codigo']

        axiosInstance.patch(`http://localhost:3001/rooms/${data.codigo}`, newData).
        then(response => {
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["rooms"])
            closeModal()
            alert('Habitacion actualizada correctamente!')
        })
        .catch(error => {
            alert(error.response.data.sqlMessage)
        })
    });

    const deleteRoom = useMutation((data) => {
        const newData = {...data}
        delete newData['codigo']

        axiosInstance.delete(`http://localhost:3001/rooms/${data.codigo}`, newData).
        then(response => {
            return response.data
        })
        .then(data => {
            queryClient.invalidateQueries(["rooms"])
            closeModal()
            alert('ELiminacion correctamente!')
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
            {initialValues.codigo === 0 ? 'Crear' : 'Actualizar'} Habitacion
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
                if (initialValues.codigo == 0) {
                    createRoom.mutate(values)
                } else if(initialValues.codigo != 0) {
                    updateRoom.mutate(values)
                } else {
                    deleteRoom.mutate(values);
                }
            }}
        >
            <Form id="form">
                <Field placeholder="Numero" type="text" id="numero" name="numero" />
                <Field placeholder="Tipo" type="text" id="tipo" name="tipo" />
                <Field placeholder="Valor" type="text" id="valor" name="valor" />
            </Form>
        </Formik>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        <Button form="form" type="submit" variant="primary">
    Save Changes
</Button>

        </Modal.Footer>
    </Modal>
  )
}