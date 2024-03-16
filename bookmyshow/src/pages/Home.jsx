import React, { useEffect, useState } from 'react'
import { showloading,hideloading } from '../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllMovies } from '../apicalls/movies'
import { message } from 'antd'


function Home() {
  
  const [movies,setMovies] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = async()=>{
    try {
      dispatch(showloading())
      const response = await getAllMovies()
      if (response.success){
        setMovies(response.data)
      }else{
        message.error(response.message)
      }
      dispatch(hideloading())
    } catch (error) {
      message.error(error.message)
      dispatch(hideloading())
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <>
   
    <div className='home-body'></div>
    </>
  )
}

export default Home