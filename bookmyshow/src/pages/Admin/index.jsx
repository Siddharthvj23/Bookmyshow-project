import React from 'react'
import { Tabs } from 'antd'
function Admin() {
  const tabitems = [
    {
      key: '1',
      label: 'Movies',

    },
    {
      key: '2',
      label: 'Theatres',
    }
  ]

  return (
    <>
      <h1>Admin</h1>
      <Tabs items={tabitems} />
    </>
  )
}

export default Admin