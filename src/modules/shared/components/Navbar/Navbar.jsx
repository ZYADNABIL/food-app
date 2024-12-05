import React, { useContext } from 'react'
import avatar from '../../../../assets/imgs/avatar.png'
import { AuthContext } from '../../../../context/AuthContext'
export default function Navbar() {
  let {loginData} = useContext(AuthContext)
  return (
    <div className='bg-white py-3 d-flex justify-content-end align-items-center '>
      <img src={avatar} alt="" width={40} height={40} className='mx-3 avatar'/>
      <h2 className='mx-5'>{loginData?.userName}</h2>
    </div>
  )
}
