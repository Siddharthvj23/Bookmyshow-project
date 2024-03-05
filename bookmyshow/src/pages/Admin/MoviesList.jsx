import React from 'react'
import { Table } from 'antd'

function MoviesList() {
    const tableHeadings = [
        {
            tittle : 'poster'
        },
        {
            tittle : 'Release Date'
        }
    ]

  return (
    <div>
        <h1>Movie table</h1>
       <Table columns={}/>

    </div>
  )
}

export default MoviesList