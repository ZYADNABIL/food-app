import React from 'react'
import homeImg from '../../../../assets/imgs/home-img.png'
export default function Header({title,description}) {
  return (
    <div className='header-container mx-5 rounded-4 row align-items-center  p-5'>
      <div className="caption text-white w-50 col-lg-6">
          <h3>{title}</h3>
          <p>{description}</p>
      </div>
      <div className="header-img col-lg-6 text-end">
          <img src={homeImg} alt="" />
      </div>
    </div>
  )
}
