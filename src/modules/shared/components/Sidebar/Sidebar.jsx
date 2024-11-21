import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import sideLogo from '../../../../assets/imgs/3.png'
export default function SideBar() {
  const [isCollapsed, setisCollapsed] = useState(false)
  let toggleCollapse = () =>{
    setisCollapsed(!isCollapsed)
  }
  
  return (
    <>
    <div className='sidebar-container rounded-3'>
      <Sidebar collapsed={isCollapsed} >
        <Menu>
          <MenuItem onClick={toggleCollapse} className='my-5 menu-logo ms-2 ' icon={<img src={sideLogo} alt="" />}>  </MenuItem>
          <MenuItem component={<Link to={'/dashboard'}/>} icon={<i className="fa-solid fa-house"></i>}>  Home </MenuItem>
          <MenuItem component={<Link to={'/dashboard/users'}/>} icon={<i className="fa-solid fa-users"></i>}>  Users </MenuItem>
          <MenuItem component={<Link to={'/dashboard/receipes'}/>} icon={<i className="fa-solid fa-receipt"></i>}>  Recipes </MenuItem>
          <MenuItem component={<Link to={'/dashboard/categories'}/>} icon={<i className="fa-solid fa-list"></i>}>  Categories </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-lock"></i>}>  Change Password </MenuItem>
          <MenuItem component={<Link to={'/login'}/>} icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}>  Logout </MenuItem>
        </Menu>
      </Sidebar>;
    </div>
    </>
  )
}
