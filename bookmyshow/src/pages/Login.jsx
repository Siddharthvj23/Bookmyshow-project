import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import name from '../assets/bg-img/Book-my-show-filmy-Pass-2-696x392.jpg'
import { message } from 'antd'
import { GetCurrentUser, LoginUser } from '../apicalls/user'
import 'animate.css'
import { useDispatch } from 'react-redux'
import { hideloading, showloading } from '../redux/loaderSlice'
import { setUser } from '../redux/userSlice'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getValiduser = async () => {
        try {
            dispatch(showloading())
            const response = await GetCurrentUser()

            console.log(response)
            dispatch(setUser(response.data))
            dispatch(hideloading())
        } catch (error) {
            dispatch(setUser(null))

        }
    }
    const onFinish = async(values)=>{
    
        try {
            const response = await LoginUser(values)
            if (response.success) {
                localStorage.setItem('token', response.token)
                // getValiduser()
                message.success(response.message)
                navigate('/')
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)

        }
    }
    return (
        <div className='bg-img'>
            <img src={name} alt="" className='formImg' />
            <div className='App-header'>
                <header>
                <main>
                    <section className='left-section'>
                        <h1>Login to BookMyShow</h1>
                    </section>
                    <section className='right-section'>
                        <Form layout='vertical' onFinish={onFinish}>
                            
                            <Form.Item 
                            label='Email:'
                            htmlFor='email'
                            name='email'
                            rules={[{required:true,message:'Email is required'}]}>
                                <Input id='email'
                                type='text'
                                placeholder='Enter your email'></Input>

                            </Form.Item>
                            <Form.Item label='Password:' 
                            
                            htmlFor='password'
                            name='password'
                            rules={[{required:true,message:'password is required'}]}>
                                <Input id='password'
                                type='password'
                                placeholder='Enter your password'></Input>
                            </Form.Item>
                            <Form.Item>
                                <Button className='btn'
                                htmlType='submit'
                                style={{fontSize:'1rem',fontWeight:'600', width:'10rem'
                                }}>Login</Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p className=' text-link'>
                              New User? <Link to='/Register'>Register Here</Link>
                            </p>
                        </div>



                    </section>
                </main>
            </header>
            </div>
        </div>
    )
}

export default Login