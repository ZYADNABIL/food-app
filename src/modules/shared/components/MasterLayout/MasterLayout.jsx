import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/SideBar'
import { AuthContext } from '../../../../context/AuthContext'

export default function MasterLayout() {
  return (
    <div>
      <div className="d-flex">
        <div ><SideBar /></div>
        <div className="w-100 ">
          <Navbar/>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
