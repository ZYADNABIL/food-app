import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sideLogo from '../../../../assets/imgs/3.png'
import { AuthContext } from '../../../../context/AuthContext';
export default function SideBar() {
  const navigate = useNavigate()
  let {loginData} = useContext(AuthContext)  
  const [isCollapsed, setisCollapsed] = useState(false)
  let toggleCollapse = () =>{
    setisCollapsed(!isCollapsed)
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
};
  
  return (
    <>
  <div className='sidebar-container position-sticky  top-0 left-0'>
      <Sidebar collapsed={isCollapsed} className='border-0'>
        <Menu>
          <MenuItem onClick={toggleCollapse} className='my-5 menu-logo ms-2 ' icon={<img src={sideLogo} alt="" />}>  </MenuItem>
          <MenuItem component={<Link to={'/dashboard'}/>} icon={<i className="fa-solid fa-house"></i>}>  Home </MenuItem>
          {loginData?.userGroup != 'SystemUser' ? <MenuItem component={<Link to={'/dashboard/users'}/>} icon={<i className="fa-solid fa-users"></i>}>  Users </MenuItem> : "" }
          <MenuItem component={<Link to={'/dashboard/receipes'}/>} icon={<i className="fa-solid fa-receipt"></i>}>  Recipes </MenuItem>
          {loginData?.userGroup != 'SystemUser' ?<MenuItem component={<Link to={'/dashboard/categories'}/>} icon={<i className="fa-solid fa-list"></i>} >  Categories </MenuItem> : ""}
          {loginData?.userGroup != 'SystemUser' ? "" : <MenuItem component={<Link to={'/dashboard/favourites'} />} icon={<i class="fa-regular fa-heart"></i>} >  Favourites </MenuItem>}
          <MenuItem icon={<i className="fa-solid fa-lock"></i>} component={<Link to={'/change-pass'}></Link>}>  Change Password </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket" ></i>} onClick={handleLogout}>  Logout </MenuItem>
        </Menu>
      </Sidebar>;
    </div>
    </>
  )
}
