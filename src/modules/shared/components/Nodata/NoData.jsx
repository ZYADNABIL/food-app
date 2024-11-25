import React from 'react'
import modalPhoto from '../../../../assets/imgs/freepik--Character--inject-70.png'

export default function NoData() {
  return (
    <div>
      <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src={modalPhoto} alt="" />
          <h3>No Data !</h3>
      </div>
    </div>
  )
}
