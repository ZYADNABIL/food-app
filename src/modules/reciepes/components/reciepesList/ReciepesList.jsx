import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Header from '../../../shared/components/Header/Header'
import defaultImg from '../../../../assets/imgs/freepik--Character--inject-70.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'
import DeleteConfirmation from '../../../shared/components/Deleteconfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { axiosInstance, CATEGORY_URLS, imageUrl, RECIEPE_URLS, TAGS_URLS, USER_RECIEPE_URLS } from '../../../../services/Urls/urls'
import NoData from '../../../shared/components/Nodata/NoData'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

export default function ReciepesList() {
  let { loginData } = useContext(AuthContext)
  const [reciepes, setReciepes] = useState([])
  const [fav, setFav] = useState(false)
  const [arrayOfPages, setArrayOfPages] = useState([])
  const [show, setShow] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedId, setSelectedId] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true);
  }
  let getReciepeList = async (pageNumber, pageSize, name, tag, category) => {
    try {
      let response = await axiosInstance.get(RECIEPE_URLS.GET_RECIEPES, { params: { pageNumber: pageNumber, pageSize: pageSize, name: name, tagId: tag, categoryId: category } })
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i++))
      setReciepes(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  let deleteReciepe = async () => {
    try {
      let response = await axiosInstance.delete(RECIEPE_URLS.DELETE_RECIEPE(selectedId),
      )
      getReciepeList()
      toast.success("deleted successfully")
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
    handleClose()
  }
  const getTags = async () => {
    try {
      const response = await axiosInstance.get(TAGS_URLS.GET_TAGS)
      console.log(response);
      setTags(response?.data)
    } catch (error) {
      console.log(error);
    }
  }
  const getCategories = async () => {
    try {
      let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES)
      console.log(response);
      setCategories(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  const getNameValue = (input) => {
    setNameValue(input.target.value)
    getReciepeList(1, 3, input.target.value, tagValue, categoryValue)
  }
  const getTagValue = (input) => {
    setTagValue(input.target.value)
    getReciepeList(1, 3, nameValue, input.target.value, categoryValue)
  }
  const getCategoryValue = (input) => {
    setCategoryValue(input.target.value)
    getReciepeList(1, 3, nameValue, tagValue, input.target.value)
  }
  const addToFav = async (id,) =>{
    try {
      let response = await axiosInstance.post(USER_RECIEPE_URLS.ADD_TO_FAVS,{recipeId:id})
      console.log(response);
      toast.success("Item added successfully to favourites")
    } catch (error) {
      console.log(error);
      toast.error("failed")
    }
  }
  const toggleFav = () => {
    setFav(!fav)
  }
  useEffect(() => {
    getReciepeList(1, 3);
    getTags()
    getCategories()
  }, [])
  return (
    <>
      <Header title={"Reciepes"} description={"You can now add your items that any user can order it from the Application and you can edit"} />
      <div className='d-flex mx-5 justify-content-between align-items-center p-4'>
        <h5>Reciepes Table details</h5>
        {loginData?.userGroup == "SystemUser" ? "" : <Link className="btn btn-success" to="/dashboard/receipes/new-reciepe">Add New Reciepe</Link>}
      </div>

      <div className="p-4 mx-5">
        <div className="row mb-4">
          <div className="col-lg-6">
            <input type="text" placeholder='search here ....' className='form-control' onChange={getNameValue} />
          </div>
          <div className="col-lg-3">
            <select name="" id="" className='form-control' onChange={getCategoryValue}>
              <option value="">Category</option>
              {categories.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-3">
            <select name="" id="" className='form-control' onChange={getTagValue}>
              <option value="">
                Tag
              </option>
              {tags.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {reciepes.length > 0 ? <table className="table table-striped rounded-4">
          <thead >
            <tr className=''>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">category Name</th>
              <th scope="col">Tag</th>
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
                    src={reciepe.imagePath ? `${imageUrl}/${reciepe.imagePath}` : defaultImg}
                    style={
                      {
                        width: '45px',
                        height: '45px',
                        objectFit: 'cover'
                      }
                    }
                  />
                </td>
                <td>{reciepe.description}</td>
                <td>{reciepe.price}</td>
                <td>{reciepe.category?.[0]?.name}</td>
                <td>{reciepe.tag?.name}</td>
                {loginData?.userGroup != "SystemUser" ? <td>
                  <i className="fa-solid fa-trash text-danger mx-3" onClick={() => { handleShow(reciepe.id) }}></i>
                  <Link to={`/dashboard/receipes/${reciepe?.id}`}>
                    <i className="fa-solid fa-pen-to-square text-warning"></i>
                  </Link>
                </td> : <td>
                   <i className="fa-solid fa-heart text-danger mx-3 " onClick={()=>addToFav(reciepe.id)}></i>
                </td>}
              </tr>
            )}
          </tbody>
        </table> : <NoData />}
        <nav aria-label="Page navigation example ">
          <ul className="pagination d-flex justify-content-center align-items-center">
            {arrayOfPages.map((pageNumber) => (
              <li className="page-item" key={pageNumber} onClick={(e) => { getReciepeList(pageNumber, 4); e.preventDefault() }}><a className="page-link" href="#" >{pageNumber}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <DeleteConfirmation deleteItem={"Reciepe"} deleteFunction={deleteReciepe} show={show} handleClose={handleClose} />
    </>
  )
}
