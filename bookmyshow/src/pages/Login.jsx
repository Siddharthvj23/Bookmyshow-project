import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import { message } from 'antd'
import { LoginUser } from '../apicalls/user'

import 'animate.css'
function Login() {
    const navigate = useNavigate()
    const onFinish = async(values)=>{
    
        try {
            const response = await LoginUser(values)
            if (response.success) {
                message.success(response.message)
                localStorage.setItem('token',response.token)
                navigate('/')
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)

        }
    }
    return (
        <div className=' grid grid-cols-3'>
            <div className=" h-[95vh] bg-cover col-span-2" style={{ backgroundImage: 'url(https://blogest.org/wp-content/uploads/2023/02/BookMyShow-Wiki-2048x1152.jpg)' }}></div>
            <div className=' min-h-screen flex flex-col items-center justify-center text-xl  text-center'>
                <header>
                <main>
                    <section className='left-section py-3'>
                        <h1>Login to BookMyShow</h1>
                    </section>
                    <section className='right-section block'>
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
                                <Button type='primary'
                                htmlType='submit'
                                style={{fontSize:'1rem',fontWeight:'600', width:'10rem'
                                }}>Login</Button>
                            </Form.Item>
                        </Form>
                        <div>
                            <p className=' text-sm '>
                              New User? <Link to='/Register' className=' bg-sky-500'>Register Here</Link>
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