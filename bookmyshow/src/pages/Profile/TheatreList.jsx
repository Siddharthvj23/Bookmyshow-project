import React from 'react'
import { Table,Button,message } from 'antd'
function TheatreList() {
    const tableheadings =[
        {
            title:'Name',
            dataIndex:'name',
            
        },
        {
            title:'Address',
            dataIndex:'address'
        },
        {
            title:'Phone Number',
            dataIndex:'phone'
        },
        {
            title:'Email',
            dataIndex:'email'
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            title:'Action',
            dataIndex:'action'
        }
    ]
  return (
    <div>
        <Table columns={tableheadings}/>
    </div>
  )
}

export default TheatreList