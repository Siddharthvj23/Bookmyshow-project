import React from 'react'
import { Table } from 'antd'

function MoviesList() {
    const tableHeadings = [
        {
            title : 'Poster'
        },
        {
          title : 'Movie name'
        },
        {
          title : 'Description'
        },
        {
          title : 'Duration'
        },
        {
          title : 'Genre'
        },
        {
          title : 'Language'
        },
        {
            title : 'Release Date'
        },
        {
          title : 'Action'
        }
    ]

  return (
    <>
    
        
       <Table columns={tableHeadings}/>

    </>
  )
}

export default MoviesList