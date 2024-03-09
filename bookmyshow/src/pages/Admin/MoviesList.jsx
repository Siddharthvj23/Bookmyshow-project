import React, { useState, useEffect } from 'react'
import { Button, Table } from 'antd'
import MovieForm from './MovieForm'
import { hideloading, showloading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { getAllMovies } from '../../apicalls/movies'
import moment from 'moment'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'

function MoviesList() {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [selectedMovie,setSelectedMovie] = useState(null)
  const [Movies,setMovies] = useState([])
  const [formType,setFormType] = useState('add')
  const dispatch = useDispatch()

  const getData = async () => {
    dispatch(showloading())
    const response = await getAllMovies()


    const allMovies = response.data

    setMovies(allMovies.map((item)=>{
      return {...item,key:`movie${item._id}`}
    }))
  
    dispatch(hideloading())
  }
  const tableHeadings = [
    {
      title: 'Poster',
      dataIndex:'poster',
      render:(text,data)=>{
        return (<img width='75' height='115' style={{objectFit:'cover'}}src={data.poster}/>)

      }

    },
    {
      title: 'Movie name',
      dataIndex: 'title'
    },
    {
      title: 'Description',
      dataIndex:'description'
     
      
    },
    {
      title: 'Duration',
      dataIndex:'duration' ,
      render:(text)=>{
        return `${text} min`}
    },
    {
      title: 'Genre',
      dataIndex:'genre'
    },
    {
      title: 'Language',
      dataIndex:'language'
    },
    {
      title: 'Release Date',
      dataIndex:'releasedate',
      render :(text,data)=>{
        return moment(data.releasedate).format("MM-DD-YYYY")
      }
    },
    {
      title: 'Action',
      render :(text,data)=>{
        return (
          <div>
            <Button onClick={()=>{
              setisModalOpen(true)
              setSelectedMovie(data)
              setFormType('edit')
            }}><EditOutlined/></Button>
            <Button><DeleteOutlined/></Button>
          </div>
        )
      }
    }
  ]
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className='form-btn'>
        <Button onClick={() => { setisModalOpen(true); setFormType('add') }}>Add Movie</Button>
      </div>

      <Table dataSource={Movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setisModalOpen={setisModalOpen}
          selectedMovie={selectedMovie}
        />)}


    </>
  )
}

export default MoviesList