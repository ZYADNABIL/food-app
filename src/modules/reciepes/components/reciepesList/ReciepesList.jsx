import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import defaultImg  from '../../../../assets/imgs/freepik--Character--inject-70.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import DeleteConfirmation from '../../../shared/components/Deleteconfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { axiosInstance, imageUrl, RECIEPE_URLS } from '../../../../services/Urls/urls'
import NoData from '../../../shared/components/Nodata/NoData'

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
        let response = await axiosInstance.get(RECIEPE_URLS.GET_RECIEPES,{params:{pageSize:10,pageNumber:1}})
        setReciepes(response.data.data)
      } catch (error) {
        console.log(error);
      }
  }
  let deleteReciepe = async () =>{
      try {
        let response = await axiosInstance.delete(RECIEPE_URLS.DELETE_RECIEPE(selectedId) , 
        )
        getReciepeList()
        toast.success("deleted successfully")
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
    <div className='d-flex mx-5 justify-content-between align-items-center p-4'>
      <h5>Reciepes Table details</h5>
      <button className="btn btn-success">Add New Reciepe</button>
    </div>
    <div className="p-4 mx-5">
      {reciepes.length > 0 ?  <table className="table table-striped rounded-4">
      <thead >
        <tr className=''>
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
          <tr key={reciepe.id} className='mt-4'>
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
    </table> : <NoData/>}
   
    </div>
    <DeleteConfirmation deleteItem={"Reciepe"} deleteFunction={deleteReciepe} show={show} handleClose={handleClose}/>
  </>
  )
}
