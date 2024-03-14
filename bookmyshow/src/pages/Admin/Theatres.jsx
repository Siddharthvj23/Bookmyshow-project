import React, { useEffect, useState } from 'react'
import { Button, Table, message } from 'antd'
import { useDispatch } from 'react-redux'
import { showloading,hideloading } from '../../redux/loaderSlice'
import { getAllTheatresToAdmin,updateTheatre} from '../../apicalls/theatres'

const TheatresTable = ()=> {
  const [theatres,setTheatres] = useState([])
  const dispatch = useDispatch()

  const getData = async ()=>{
      try {
        dispatch(showloading())
        const response = await getAllTheatresToAdmin()
        if (response.success){
          const allTheatres = response.data
          setTheatres(
            allTheatres.map((item)=>{
              return {...item, key:`theatre${item._id}`}
            })
          )
        }else{
          message.error(response.message)
        }
        dispatch(hideloading())
      } catch (error) {
        dispatch(hideloading())
        message.error(error.message)
      }
  }

  const handleStatusChange = async(theatre) =>{
    try {
      dispatch(showloading())
      let values = {...theatres,theatreId: theatre._id, isActive: !theatre.isActive}
      const response = await updateTheatre(values)
      console.log(response, theatre);
      if(response.success){
        message.success(response.message)
        getData()
      }
      dispatch(hideloading())
    } catch (error) {
      dispatch(hideloading())
      message.error(error.message)
      
    }
  }
  console.log(handleStatusChange)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key : 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key : 'address'
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      render: (text,data) =>{
        return data.owner && data.owner.name
      }
      
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status,data)=>{
        if(data.isActive){
          return 'Approved'
        }else{
          return 'Pending/Blocked'
        }
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text,data) =>{
        return(
          <div className='flex align-middle gap-10'>
            {data.isActive? <Button onClick={()=>handleStatusChange(data)}>Blocked</Button>:<Button onClick={()=>handleStatusChange(data)}>Approved</Button>}
          </div>
        )
      }
    },
  ]

  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      {theatres && theatres.length>0 &&
          <Table dataSource={theatres} columns={columns}/>
      }
    </div>
  )
}

export default TheatresTable
