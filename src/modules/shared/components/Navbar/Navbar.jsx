import React from 'react'
import avatar from '../../../../assets/imgs/avatar.png'
export default function Navbar({loginData}) {
  return (
    <div className='bg-white py-3 d-flex justify-content-end align-items-center '>
      <img src={avatar} alt="" width={40} height={40} className='mx-3 avatar'/>
      <h2>{loginData?.userName}</h2>
    </div>
  )
}
