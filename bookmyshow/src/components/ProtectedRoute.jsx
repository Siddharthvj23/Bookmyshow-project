import React, { useEffect,useState } from 'react'
import { GetCurrentUser } from '../apicalls/user'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { hideloading, showloading } from '../redux/loaderSlice'
import {useDispatch} from 'react-redux'

function ProtectedRoute({children}) {
const [user,setUser] = useState(null)
const dispatch = useDispatch()
    const getValiduser = async()=>{
        try {
            dispatch(showloading())
            const response = await GetCurrentUser()
            console.log(response)
            dispatch(setUser(response.data))
            dispatch(hideloading())
        } catch (error) {
            dispatch(setUser(null))
            message.error(error.message)            
        }
    }

    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValiduser()
        }else{
            navigate("/login")
        }
    },[])
  return (
    <div>{user && user.name}</div>
  )
}

export default ProtectedRoute