import { Form, Row, Col, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import React from 'react'

function MovieForm() {
    return (
        <div>
            <Form>
                <Row
                    gutter={{
                        xs: 6,
                        sm: 10,
                        md: 12,
                        lg: 16
                    }}>
                    <Col span={24}>
                        <Form.Item
                            label='Movie Name'
                            htmlFor='title'
                            name="title"
                            className='d-block'
                            rules={[{ required: true, message: "Movie name is required" }]}
                        >
                            <Input
                                id='title'
                                type='text'
                                placeholder='Enter the movie name'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label = 'Description'
                            htmlFor='description'
                            name = 'description'
                            className='d-block'
                            rules={[{required:true, message:'Description is required'}]}
                        >
                            <TextArea
                                id='decription'
                                rows='4'
                                placeholder='Enter the description'
                            ></TextArea>

                        </Form.Item>
                    </Col>
                    
                </Row>
            </Form>
        </div>
    )
}

export default MovieForm