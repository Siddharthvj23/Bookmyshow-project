import React from 'react'
import { Tabs } from 'antd'
import TheatreList from './TheatreList'
import Booking from './Booking'

function Profile() {
  const tabitems = [
    {
      key:'1',
      label:'Theatres',
      children : <TheatreList/>
    },
    {
      key:'2',
      label:'Booking',
      children : <Booking/>
    }
  ]
    return (
      <div>
        <h1>Profile</h1>
        <Tabs items={tabitems}/>

      </div>
    )
  }
  
export default Profile