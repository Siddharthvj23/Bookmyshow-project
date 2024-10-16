import React from 'react'
import { Button, Form, Input, message,Radio} from 'antd'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../apicalls/user'
import 'animate.css'
import { useNavigate } from 'react-router-dom'
import name from '../assets/bg-img/Register-Img.jpg'

function Register() {
    const navigate = useNavigate()
    const onFinish = async (value) => {
        console.log(value)
        try {
            const response = await RegisterUser(value)
            if (response.success) {
                message.success(response.message)
                navigate('/Login')
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)

        }
    }
    return (
        <div className='bg-img'>
            <img src={name} alt="" className='formImg'/>
            <div className='Register-box'>
                <div>
                <header>
                    <main>
                        <section className='left-section'>
                            <h1>Register to BookMyShow</h1>
                        </section>
                        <section className='right-section '>
                            <Form layout='vertical' onFinish={onFinish}>
                                <Form.Item
                                    label='Name:'
                                    htmlFor='name'
                                    name='name'
                                    rules={[{ required: true, message: 'Name is required' }]}>
                                    <Input id='name'
                                        type='text'
                                        placeholder='Enter your name'
                                        style={{border:'2px solid black',borderRadius:'1.5rem'}}
                                        rules={[{ required: true, message: "Email is required!" }]}></Input>
                                </Form.Item>
                                <Form.Item
                                    label='Email:'
                                    htmlFor='email'
                                    name='email'
                                    rules={[{ required: true, message: 'Email is required' }]}>
                                    <Input id='email'
                                        type='text'
                                        placeholder='Enter your email'
                                        style={{border:'2px solid black',borderRadius:'1.5rem'}}></Input>
                                        

                                </Form.Item>
                                <Form.Item label='Password:'

                                    htmlFor='password'
                                    name='password'
                                    rules={[{ required: true, message: 'password is required' }]}>
                                    <Input id='password'
                                        type='password'
                                        placeholder='Enter your password'
                                        style={{border:'2px solid black',borderRadius:'1.5rem'}}></Input>
                                </Form.Item>
                                <Form.Item>
                                    <Button 
                                      
                                        htmlType='submit'
                                        style={{
                                            fontSize: '1rem', fontWeight: '600', width: '10rem',
                                            backgroundColor:'black',color:'white'
                                        }}
                            
                                    >Sign Up</Button>
                                </Form.Item>
                            </Form>
                            <div>
                                <p className='text-link'>
                                    Already a user? <Link to='/login' >Login Now</Link>
                                </p>
                            </div>



                        </section>
                    </main>
                </header></div>
            </div>
        </div>
    )
}

export default Register