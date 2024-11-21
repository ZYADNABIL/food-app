import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import defaultImg  from '../../../../assets/imgs/freepik--Character--inject-70.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import { toast } from 'react-toastify'

export const imageUrl = 'https://upskilling-egypt.com:3006' ;  
export default function ReciepesList() {
  const [reciepes, setReciepes] = useState([])
  const [show, setShow] = useState(false);
  const [selectedId,setSelectedId] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  } 
  let getReciepeList = async () =>{
      try {
        let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
          {
            headers : {Authorization:localStorage.getItem('token')}
          }
        )
        setReciepes(response.data.data)
      } catch (error) {
        console.log(error);
      }
  }
  let deleteReciepe = async () =>{
      try {
        let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}` , 
          {
            headers: {Authorization: localStorage.getItem('token')}
          }
        )
        getReciepeList()
        toast.success('success')
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
      handleClose()
  }
  useEffect(()=>{
    getReciepeList();
  },[])
  return (
    <>
    <Header title={"Reciepes"} description={"You can now add your items that any user can order it from the Application and you can edit"} />
    <div className='d-flex justify-content-between align-items-center p-4'>
      <h5>Reciepes Table details</h5>
      <button className="btn btn-success">Add New Reciepe</button>
    </div>
    <div className="p-4">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">category Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {reciepes.map(reciepe =>
          <tr key={reciepe.id}>
            <th scope="row">{reciepe.id}</th>
            <td>{reciepe.name}</td>
            <td>
              <img
                  src={reciepe.imagePath? `${imageUrl}/${reciepe.imagePath}`:defaultImg}    
                  style={
                    {
                      width:'45px',
                      height:'45px',
                      objectFit:'cover'
                    }
                  }        
               />
            </td>
            <td>{reciepe.description}</td>
            <td>{reciepe.price}</td>
            <td>{reciepe.category?.[0]?.name}</td>
            <td>
            <i className="fa-solid fa-trash text-danger mx-3" onClick={()=>{handleShow(reciepe.id)}}></i>
            <i className="fa-solid fa-pen-to-square text-warning"></i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    <Modal show={show} onHide={handleClose} className='d-flex justify-content-center align-items-center'>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center align-items-center flex-column'>
        <img src={modalPhoto} alt="" />
        <div className='text-center'>
        <h5>Delete This Item ?</h5>
        <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteReciepe}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
