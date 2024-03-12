import { Form, Row, Col, Input, Button, Modal, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { showloading,hideloading } from "../../redux/loaderSlice"
import { useDispatch, useSelector } from "react-redux"
import { addTheatre,updateTheatre } from "../../apicalls/theatres"

function TheatreForm({isModalOpen,setisModalOpen,selectedTheatre,setSelectedTheatre,formType,getData}) {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.user)

    const onFinish = async(values) =>{
        try {
            dispatch(showloading())
            let response = null
            if(formType === 'add'){
                response = await addTheatre(values)

            }else{
                values.theatreId = selectedTheatre._id
                response = await updateTheatre({...values , owner: user._id})
            }

            if (response.success){
                getData()
                message.success(response.message)
                setisModalOpen(false)
            }else{
                message.error(response.message)
            }
            dispatch(hideloading())
        } catch (error) {
            message.error(error.message)
            
        }
    }

    const handleCancel=()=>{
        setisModalOpen(false)
        setSelectedTheatre(null)
    }

    return (
        <>
            <Modal
                centered
                title={formType === 'add' ? 'Add Theatre' : 'Edit Theatre'}
                open={isModalOpen}
                onCancel={handleCancel}
                width={700}
            >
                <Form layout="vertical"
                    style={{ width: "100%" }} 
                    onFinish={onFinish}
                    initialValues={selectedTheatre}
                >
                    <Row gutter={{
                        xs: 6,
                        sm: 10,
                        md: 12,
                        lg: 16
                    }}>
                        <Col span={24}>
                            <Form.Item
                                label="Theatre Name"
                                htmlFor="name"
                                name="name"
                                className="d-block"
                                rules={[{ required: true, message: "Theatre name is required" }]}
                            >
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter the Theatre name"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Theatre Address"
                                htmlFor="address"
                                name="address"
                                className="d-block"
                                rules={[{ required: true, message: "Theatre address is required" }]}
                            >
                                <TextArea
                                    id="address"
                                    rows='3'
                                    placeholder="Enter the Theatre address"></TextArea>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row gutter={{
                                xs: 6,
                                sm: 10,
                                md: 12,
                                lg: 16
                            }}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Email"
                                        htmlFor="email"
                                        name="email"
                                        className="d-block"
                                        rules={[{ required: true, message: "Email is required" }]}
                                    >
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter the Email"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Phone Number"
                                        htmlFor="phone"
                                        name="phone"
                                        className="d-block"
                                        rules={[{ required: true, message: "Phone Number is required" }]}
                                    >
                                        <Input
                                            id="phone"
                                            type="number"
                                            placeholder="Enter the Phone Number"></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button
                            block
                            type='primary'
                            htmlType='submit'
                            style={{ fontSize: '1rem', fontWeight: "600" }}
                        >
                            Submit the Data
                        </Button>
                        {/* <Button block>Cancel</Button> */}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default TheatreForm