import React from 'react'
import Header from '../../../shared/components/Header/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import { toast } from 'react-toastify';
import { axiosInstance, CATEGORY_URLS } from '../../../../services/Urls/urls';
import { useForm } from 'react-hook-form';
import DeleteConfirmation from '../../../shared/components/Deleteconfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/Nodata/NoData';
export default function CategoriesList() {
  const [categories, setCategories] = useState([])
  const [arrayOfPages,setArrayOfPages] = useState([])

  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedId, setSelectedId] = useState(0)

  const handleClose = () => setShow(false);
  const handleCloseAdd = () => {
    setShowAdd(false);
    reset({
      name: ''
    })
  }
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  const handleShowAdd = () => {
    setShowAdd(true);
  }
  const handleShowUpdate = (categories) => {
    setSelectedId(categories.id)
    setValue('name', categories.name)
    setShowUpdate(true);
  }
  let { register, setValue, reset, formState: { errors, isSubmitting }, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(CATEGORY_URLS.ADD_CATEGORY, data)
      handleCloseAdd()
      toast.success('Category added successfully')
      getCategoriesList()
    } catch (error) {
      console.log(error);
      toast.error('failed')
    }
  }
  const onSubmitUpdate = async (data) => {
    try {
      let response = await axiosInstance.put(CATEGORY_URLS.UPDATE_CATEGORY(selectedId), data)
      handleCloseUpdate()
      toast.success("Item updated successfully")
      getCategoriesList()
    } catch (error) {
      toast.error(error)
    }
  }
  let getCategoriesList = async (pageNumber,pageSize, name) => {
    try {
      let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES, { params: { pageNumber: pageNumber, pageSize: pageSize,name:name } })
        setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i++))
        setCategories(response.data.data)
    }
    catch (error) {
      console.log(error);

    }
  }
  let deleteCategory = async () => {
    try {
      let response = await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(selectedId),
      )
      getCategoriesList()
      toast.success('item deleted successfully')
    } catch (error) {
      console.log(error);
      toast.error('failed')
    }
    handleClose()
  }
  const getNameValue = (input) =>{
    getCategoriesList(1,5,input.target.value);
  }
  useEffect(() => {
    getCategoriesList();
  }, [])

  return (
    <>
    <div className='overflow-hidden'>
      <Header title={"Categories"} description={"You can now add your items that any user can order it from the Application and you can edit"} />
      <div className='d-flex justify-content-between align-items-center p-4 mx-4 '>
        <h5>Categories Table details</h5>
        <button className="btn btn-success" onClick={() => handleShowAdd()}>Add New Category</button>
      </div>
      <div className="row">
        <div className="col-lg-8">
        <input type="text" placeholder='search here ....' className='form-control ms-5'onChange={getNameValue}/>
        </div>
      </div>
      <div className="p-4 mx-4">
        {categories.length > 0 ? <table className="table table-striped">
          <thead className='bg-primary'>
            <tr >
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
                  <div className="dropdown">
                    <button className="btn dropdown-toggle fw-bold" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      ...
                    </button>
                    <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href='#' onClick={() => handleShow(category.id)}><i className="fa-solid fa-trash text-danger mx-3" ></i>Delete</a></li>
                      <li><a className="dropdown-item" href='#' onClick={() => handleShowUpdate(category)}><i className="fa-solid fa-pen-to-square text-warning mx-3" ></i>Update</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table> : <NoData />}
        <nav aria-label="Page navigation example ">
          <ul className="pagination d-flex justify-content-center align-items-center">
            {arrayOfPages.map((pageNumber)=>(
            <li className="page-item" key={pageNumber} onClick={(e)=>{getCategoriesList(pageNumber,4);e.preventDefault()}}><a className="page-link" href="#" >{pageNumber}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <DeleteConfirmation deleteItem={"category"} deleteFunction={deleteCategory} show={show} handleClose={handleClose} />
      <Modal show={showAdd} onHide={handleCloseAdd} className=''>
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
            <form className='my-4' onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"></span>
                <input type="text"
                  className="form-control"
                  placeholder="Category name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  {...register("name", {
                    required: "Name is required"
                  })}
                />
              </div>
              {errors.name && (
                <span className="text-danger my-3">{errors.name.message}</span>
              )}
              <button disabled={isSubmitting} className='w-100 btn btn-success mt-5'>
                {isSubmitting ? "Adding..." : "Add"}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showUpdate} onHide={handleCloseUpdate} className=''>
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=''>
            <form className='my-4' onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"></span>
                <input type="text"
                  className="form-control"
                  placeholder="Category name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  {...register("name", {
                    required: "Name is required"
                  })}
                />
              </div>
              {errors.name && (
                <span className="text-danger my-3">{errors.name.message}</span>
              )}
              <button disabled={isSubmitting} className='w-100 btn btn-success mt-5'>
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>

    </>
  )
}
