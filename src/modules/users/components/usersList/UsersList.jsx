import React, { useEffect, useState } from 'react';
import Header from '../../../shared/components/Header/Header';
import defaultImg from '../../../../assets/imgs/freepik--Character--inject-70.png';
import { axiosInstance, imageUrl, USERS_URLS } from '../../../../services/Urls/urls';
import NoData from '../../../shared/components/Nodata/NoData';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../../shared/components/Deleteconfirmation/DeleteConfirmation';

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const pageSize = 40; // Defined page size

  const handleClose = () => setShow(false);
  const handleCloseUser = () => setShowUser(false);
  
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const handleShowUser = (id) => {
    setSelectedId(id);
    setShowUser(true);
    getUser(id);
  };

  const getUsers = async (pageNumber = 1) => {
    try {
      let response = await axiosInstance.get(USERS_URLS.GET_USERS, { params: { pageNumber, pageSize } });
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i++))
      setUsersList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      await axiosInstance.delete(USERS_URLS.DELETE_USER(selectedId));
      getUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
    handleClose();
  };

  const getUser = async (id) => {
    try {
      let response = await axiosInstance.get(USERS_URLS.GET_USER(id));
      setUserDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Header title="Welcome!" description="You can now add your items that any user can order it from the Application and you can edit" />
      <div className='mx-5 p-4'>
        <h5>Users Table Details</h5>
        <p>You can check all details</p>
        {usersList.length > 0 ? (
          <table className="table table-striped rounded-4">
            <thead>
              <tr>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(user => (
                <tr key={user.id}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td><img src={user.imagePath ? `${imageUrl}/${user.imagePath}` : defaultImg} alt="Profile" style={{ width: '45px', height: '45px', objectFit: 'cover' }} /></td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.country}</td>
                  <td>
                    <i className="fa-solid fa-trash text-danger mx-3" onClick={() => handleShow(user.id)}></i>
                    <i className="fa-solid fa-eye" onClick={() => handleShowUser(user.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <NoData />}
      </div>
      <DeleteConfirmation deleteItem="User" deleteFunction={deleteUser} show={show} handleClose={handleClose} />
      <Modal show={showUser} onHide={handleCloseUser}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Name: {userDetails.userName}</p>
            <p>ID: {userDetails.id}</p>
            <p>Email: {userDetails.email}</p>
            <p>Country: {userDetails.country}</p>
            <p>Phone Number: {userDetails.phoneNumber}</p>
            <img src={userDetails.imagePath ? `${imageUrl}/${userDetails.imagePath}` : defaultImg} alt="Profile" style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
        </Modal.Body>
      </Modal>
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center align-items-center">
          <li className="page-item"><a className="page-link" href="#" onClick={(e) => { e.preventDefault(); getUsers(1); }}>&laquo;</a></li>
          {arrayOfPages.map(pageNumber => (
            <li className="page-item" key={pageNumber}><a className="page-link" href="#" onClick={(e) => { e.preventDefault(); getUsers(pageNumber); }}>{pageNumber}</a></li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={(e) => { e.preventDefault(); getUsers(arrayOfPages.length); }}>&raquo;</a></li>
        </ul>
      </nav>
    </div>
  );
}
