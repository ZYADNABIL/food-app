import React from 'react'
import Header from '../../../shared/components/Header/Header'

export default function Dashboard({loginData}) {
  return (
    <div>
      <Header title={`Welcome ${loginData?.userName} !`} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    </div>
  )
}
