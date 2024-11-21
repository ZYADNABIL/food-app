import React from 'react'
import Header from '../../../shared/components/Header/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import { toast } from 'react-toastify';
export default function CategoriesList() {
  const [categories, setCategories] = useState([])
  const [show, setShow] = useState(false);
  const [selectedId,setSelectedId] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  } 
  let getCategoriesList = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      )
      setCategories(response.data.data)
    }
    catch (error) {
      console.log(error);

    }
  }
    let deleteCategory = async () =>{
      try {
        let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
          {
            headers : {Authorization : localStorage.getItem('token')}
          }
        )
        getCategoriesList()
        toast.success('item deleted successfully')
      } catch (error) {
        console.log(error);
        toast.error('failed')
      }
      handleClose()
    }
  useEffect(() => {
    getCategoriesList();
  }, [])

  return (
    <>
      <Header title={"Categories"} description={"You can now add your items that any user can order it from the Application and you can edit"} />
      <div className='d-flex justify-content-between align-items-center p-4'>
        <h5>Categories Table details</h5>
        <button className="btn btn-success">Add New Category</button>
      </div>
      <div className="p-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Creation date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.id}>
              <th scope="row">{category.id}</th>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td>
              <i className="fa-solid fa-trash text-danger mx-3" onClick={()=>handleShow(category.id)}></i>
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
          <Button variant="danger" onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
