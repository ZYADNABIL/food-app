import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import { useState } from 'react';
export default function DeleteConfirmation({deleteItem,deleteFunction,showState}) {
  const [show, setShow] = useState(false);
  const handleClose = () => showState(false);
  const handleShow = (id) => {
    // setSelectedId(id);
    showState()
  } 
  return (
    <Modal show={show} onHide={handleClose} className='d-flex justify-content-center align-items-center'>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src={modalPhoto} alt="" />
          <div className='text-center'>
          <h5>Delete This Item ?</h5>
          <p>are you sure you want to delete this {deleteItem} ? if you are sure just click on delete it</p>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteFunction}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
