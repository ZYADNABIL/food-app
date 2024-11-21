import React from 'react'
import homeImg from '../../../../assets/imgs/home-img.png'
export default function Header({title,description}) {
  return (
    <div className='header-container d-flex justify-content-between align-items-center  p-5'>
      <div className="caption text-white w-50">
          <h3>{title}</h3>
          <p>{description}</p>
      </div>
      <div className="header-img">
          <img src={homeImg} alt="" />
      </div>
    </div>
  )
}
