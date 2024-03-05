import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/user'
import { useNavigate } from 'react-router-dom'
import { message, Layout, Menu } from 'antd'
import { hideloading, showloading } from '../redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'antd/es/layout/layout'
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { setUser } from '../redux/userSlice'

function ProtectedRoute({ children }) {
    const{ user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navitems = [
        {
            label: 'Home',
            icon: <HomeOutlined />
        },
        {
            label: `${user? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
            {
            label: (
                <span 
                onClick={()=>{
                user.isAdmin ?navigate("/Admin"): navigate("/Profile");
                    }}
                >
                My Profile
                </span>),
            icon: <ProfileOutlined />
        },
        {
            label:(<Link to='/login' onClick={(()=>{localStorage.removeItem('token')})}> Log out </Link>),
            icon: <LogoutOutlined />
        },]

        }
    

    ]



const getValiduser = async () => {
    try {
        dispatch(showloading())
        const response = await GetCurrentUser()
        // console.log(response)
        dispatch(setUser(response.data))
        dispatch(hideloading())
    } catch (error) {
        dispatch(setUser(null))
        message.error(error.message)
    }
}



useEffect(() => {
    if (localStorage.getItem('token')) {
        getValiduser()
    } else {
        navigate("/login")
    }
}, [])
return (
    user&&(
    <>
        <Layout>
            <Header className='nav-container'>

                <h3 className=' text-white'>
                    Book my show
                </h3>
                <Menu theme='dark' mode='horizontal' items={navitems} />

            </Header>
           <div className='child-container'>{children}</div> 
        </Layout>
    </>
)
)
}

export default ProtectedRoute