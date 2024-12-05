import React, { useContext } from 'react'
import Header from '../../../shared/components/Header/Header'
import { AuthContext } from '../../../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  let {loginData} =useContext(AuthContext)
  return (
    <div>
      <Header title={`Welcome ${loginData?.userName} !`} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
      {loginData?.userGroup == "SystemUser" ? 
        <div className='d-flex justify-content-between align-items-center p-5 user-dash mx-5 my-5 rounded-4'>
          <div>
            <h4>Show the Recipes !</h4>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
          </div>
          <Link className='bg-success py-2 px-4 border-none text-white rounded-4 text-decoration-none' to="/dashboard/receipes">Recipes <i class="fa-solid fa-arrow-right"></i></Link>
        </div>
      :""}
    </div>
  )
}
