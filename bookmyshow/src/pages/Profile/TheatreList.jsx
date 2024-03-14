import React, { useEffect } from 'react'
import { Table,Button,message } from 'antd'
import { useState } from 'react'
import { showloading,hideloading } from '../../redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import TheatreForm from './TheatreForm'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { getAllTheatres } from '../../apicalls/theatres'
import DeleteTheatreModal from './DeleteTheatre'

function TheatreList() {
    const {user} = useSelector((state) => state.user)
    const [isModalOpen, setisModalOpen] = useState(false)
    const [selectedTheatre,setSelectedTheatre] = useState(null)
    const [formType,setFormType] = useState('add')
    const [Theatres,setTheatres] = useState([])
    const [isDeleteModalOpen,setisDeleteModalOpen] = useState(false)
    const dispatch = useDispatch()

    const getData = async()=>{
        try {
            dispatch(showloading())
        const response = await getAllTheatres({owner: user._id})

        console.log(response)
        if (response.success){
            const allTheatres = response.data

            setTheatres(
                allTheatres.map((item)=>{
                    return { ...item, key:`theatre${item._id}`}

                })
            )
        }else{
            message.error(response.error)
        }
        dispatch(hideloading())

        } catch (error) {
            dispatch(hideloading())
            message.error(error.message)            
        }
      

    }


    const tableheadings =[
        {
            title:'Name',
            dataIndex:'name',
            key :"name"
            
        },
        {
            title:'Address',
            dataIndex:'address',
            key : "address"
        },
        {
            title:'Phone Number',
            dataIndex:'phone',
            key : 'phone'
        },
        {
            title:'Email',
            dataIndex:'email',
            key : "email"
        },
        {
            title:'Status',
            dataIndex:'status',
            render:( status,data)=>{
                if(data.isActive){
                    return "Approved"
                }else{
                    return "Pending/Blocked"
                }
            }
        },
        {
            title:'Action',
            dataIndex:'action',
            render:(text,data)=>{
                return(
                    <div>
                        <Button onClick={()=>{
                            setisModalOpen(true)
                            setSelectedTheatre(data)
                            setFormType('edit')
                        }}><EditOutlined/></Button>
                        <Button 
                            onClick={()=>{
                                setisDeleteModalOpen(true)
                                setSelectedTheatre(data)
                            }}><DeleteOutlined/></Button>
                        {data.isActive && <Button>+Show</Button>}
                    </div>
                )
            }
        }
    ]

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <div className='form-btn'> 
            <Button  onClick={()=>{setisModalOpen(true); setFormType('add')}}>Add Theatres</Button>
          
        </div>
       
        <Table dataSource={Theatres} columns={tableheadings}/>
        {isModalOpen &&(
            <TheatreForm
                isModalOpen={isModalOpen}
                formType={formType}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
                setisModalOpen={setisModalOpen}
                getData={getData}
                />
        )}

        {isDeleteModalOpen &&(
            <DeleteTheatreModal
                isDeleteModalOpen={isDeleteModalOpen}
                selectedTheatre={selectedTheatre}
                setisDeleteModalOpen={setisDeleteModalOpen}
                setSelectedTheatre={setSelectedTheatre}
                getData={getData}/>
        )}
    </div>
  )
}

export default TheatreList