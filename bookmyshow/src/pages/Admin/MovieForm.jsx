import { Form, Row, Col, Input, Select, Button, Modal, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { showloading, hideloading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import React from 'react'
import { addMovie, updateMovie } from '../../apicalls/movies'

function MovieForm({ isModalOpen, setisModalOpen, selectedMovie, setSelectedMovie, formType ,getData}) {

    const dispatch = useDispatch()

    if (selectedMovie) {
        selectedMovie.releasedate = moment(selectedMovie.releasedate).format('YYYY-MM-DD')
    }
    console.log(selectedMovie)
    const onFinish = async (values) => {
        try {
            dispatch(showloading())
            let response = null;
            if (formType === 'add') {
                response = await addMovie(values)
                setSelectedMovie(null)
            } else {
                response = await updateMovie({ ...values, movieId: selectedMovie._id })
                // setSelectedMovie(null)
            }

            if (response.success) {
                getData()
                message.success(response.message)
                setisModalOpen(false)
            } else {
                message.error(response.message)
            }
            dispatch(hideloading())
        } catch (error) {
            message.error(error.message)
        }
    }
    const handleCancel = () => {
        setisModalOpen(false)
        setSelectedMovie(null)
    }
    return (
        <div>
            <Modal
                centered
                title={formType === "add" ? "Add Movie" : "Edit Movie"}
                open={isModalOpen}
                onCancel={handleCancel}

                width={700}
            >
                <Form layout="vertical"
                    style={{ width: "100%" }} onFinish={onFinish} initialValues={selectedMovie} >
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
                                label='Description'
                                htmlFor='description'
                                name='description'
                                className='d-block'
                                rules={[{ required: true, message: 'Description is required' }]}
                            >
                                <TextArea
                                    id='decription'
                                    rows='4'
                                    placeholder='Enter the description'
                                ></TextArea>

                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row
                                gutter={{
                                    xs: 6,
                                    sm: 10,
                                    md: 12,
                                    lg: 16

                                }}>
                                <Col span={8}>
                                    <Form.Item
                                        label='Movie Duration(in min)'
                                        htmlFor='duration'
                                        name='duration'
                                        className='d-block'
                                        rules={[{
                                            required: true, message: "Movie duration is required!"
                                        }]}>
                                        <Input
                                            id='duration'
                                            type='number'
                                            placeholder='Enter the movie duration'>

                                        </Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label='Select Movie Language'
                                        htmlFor='language'
                                        name='language'
                                        className='d-block'
                                        rules={[{
                                            required: true, message: 'Movie language is required!'
                                        }]}>
                                        <Select
                                            id="language"
                                            defaultValue='Select Language'
                                            style={{ width: "100%", height: "45px" }}
                                            options={[
                                                { value: "English", label: "English" },
                                                { value: "Hindi", label: "Hindi" },
                                                { value: "Punjabi", label: "Punjabi" },
                                                { value: "Telugu", label: "Telugu" },
                                                { value: "Bengali", label: "Bengali" },
                                                { value: "German", label: "German" },
                                            ]}></Select>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label='Release Date'
                                        htmlFor='releasedate'
                                        name='releasedate'
                                        className='d-block'
                                        rules={[{
                                            required: true, message: 'Movie Release Date is Required!'
                                        }]}>
                                        <Input
                                            id='releasedate'
                                            type='date'
                                            placeholder='Choose the release date'>

                                        </Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row
                                gutter={{
                                    xs: 6,
                                    sm: 10,
                                    md: 12,
                                    lg: 16

                                }}>
                                <Col span={8}>
                                    <Form.Item
                                        label='Select Movie Genre'
                                        htmlFor='genre'
                                        name='genre'
                                        className='d-block'
                                        rules={[{
                                            required: true, message: 'Movie Ganre is required'
                                        }]}>
                                        <Select
                                            defaultValue='Select Movie'
                                            style={{ width: '100%' }}
                                            options={[
                                                { value: "Action", label: "Action" },
                                                { value: "Comedy", label: "Comedy" },
                                                { value: "Horror", label: "Horror" },
                                                { value: "Love", label: "Love" },
                                                { value: "Patriot", label: "Patriot" },
                                                { value: "Bhakti", label: "Bhakti" },
                                                { value: "Thriller", label: "Thriller" },
                                                { value: "Mystery", label: "Mystery" },
                                            ]}></Select>
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item
                                        label='Poster URL'
                                        htmlFor='poster'
                                        name='poster'
                                        className='d-block'
                                        rules={[{
                                            required: true, message: 'Movie Poster is required'
                                        }]}>
                                        <Input
                                            id='poster'
                                            type='text'
                                            placeholder='Enter the poster URL'
                                        ></Input>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                    <Form.Item>
                        <Button
                            block
                          
                            htmlType='submit'
                            style={{ fontSize: '1rem', fontWeight: "600", backgroundColor: '#1677ff'}}
                        >
                            Submit the Data
                        </Button>
                        {/* <Button block>Cancel</Button> */}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default MovieForm