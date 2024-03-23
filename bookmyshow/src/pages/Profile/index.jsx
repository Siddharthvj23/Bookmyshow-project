import React from 'react'
import { Tabs } from 'antd'
import TheatreList from './TheatreList'
import Booking from './Booking'

function Profile() {
  const tabitems = [
    {
      key: '1', 
      label: 'Booking',
      children: <Booking />

    },
    {
      key: '2',
      label: 'Theatres',
      children: <TheatreList />
    }
  ]
  return (
    <div>
      <Tabs items={tabitems} />

    </div>
  )
}

export default Profile