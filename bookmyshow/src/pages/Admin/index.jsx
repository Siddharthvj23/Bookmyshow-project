import React from 'react'
import { Tabs } from 'antd'
import MoviesList from './MoviesList'
import Theatres from './Theatres'

function Admin() {
  const tabitems = [
    {
      key: '1',
      label: 'Movies',
      children : <MoviesList/>

    },
    {
      key: '2',
      label: 'Theatres',
      children : <Theatres/>
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