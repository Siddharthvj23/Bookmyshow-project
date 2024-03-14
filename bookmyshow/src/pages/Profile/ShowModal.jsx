import React from 'react'
import { Col, Table, Modal, Row, Form, Button, Input, Select } from 'antd'
import { showloading, hideloading } from '../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import {
    ArrowLeftOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { getAllMovies } from '../../apicalls/movies'



const ShowModal = ({ }) => {

    const columns = [
        {
            title: "Show Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Show Date",
            dataIndex: "date",
            render: (text, data) => {
                return moment(text).format("MMM Do YYYY");
            },
        },
        {
            title: "Show Time",
            dataIndex: "time",
            render: (text, data) => {
                return moment(text, "HH:mm").format("hh:mm A");
            },
        },
        {
            title: "Movie",
            dataIndex: "movie",


        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
            key: "ticketPrice",
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats",
            key: "totalSeats",
        },
        {
            title: "Available Seats",
            dataIndex: "seats",

        },
        {
            title: "Action",
            dataIndex: "action",
        }]
    return (
        <div>
            <Modal
                centered
                // title={selectedTheatre.name}
                // open={isShowModalOpen}
                // onCancel={handleCancel}
                width={1200}
                footer={null}
            >
                <div className="flex justify-between">
                    <h3>
                        {view === "table"
                            ? "List of Shows"
                            : view === "form"
                                ? "Add Show"
                                : "Edit Show"}
                    </h3>
                    {view === "table" && (
                        <Button  onClick={() => setView("form")}>
                            Add Show
                        </Button>
                    )}
                </div>
                {view === "table" && <Table dataSource={shows} columns={columns} />}

                {(view === "form" || view === "edit") && (
                    <Form
                        className=""
                        layout="vertical"
                        style={{ width: "100%" }}
                        initialValues={view === "edit" ? selectedShow : null}
                        // onFinish={onFinish}
                    >
                        <Row
                            gutter={{
                                xs: 6,
                                sm: 10,
                                md: 12,
                                lg: 16,
                            }}
                        >
                            <Col span={24}>
                                <Row
                                    gutter={{
                                        xs: 6,
                                        sm: 10,
                                        md: 12,
                                        lg: 16,
                                    }}
                                >
                                    <Col span={8}>
                                        <Form.Item
                                            label="Show Name"
                                            htmlFor="name"
                                            name="name"
                                            className="d-block"
                                            rules={[
                                                { required: true, message: "Show name is required!" },
                                            ]}
                                        >
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter the show name"
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Show Date"
                                            htmlFor="date"
                                            name="date"
                                            className="d-block"
                                            rules={[
                                                { required: true, message: "Show date is required!" },
                                            ]}
                                        >
                                            <Input
                                                id="date"
                                                type="date"
                                                placeholder="Enter the show date"
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Show Timing"
                                            htmlFor="time"
                                            name="time"
                                            className="d-block"
                                            rules={[
                                                { required: true, message: "Show time is required!" },
                                            ]}
                                        >
                                            <Input
                                                id="time"
                                                type="time"
                                                placeholder="Enter the show date"
                                            ></Input>
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
                                        lg: 16,
                                    }}
                                >
                                    <Col span={8}>
                                        <Form.Item
                                            label="Select the Movie"
                                            htmlFor="movie"
                                            name="movie"
                                            className="d-block"
                                            rules={[{ required: true, message: "Movie  is required!" }]}
                                        >
                                            <Select
                                                id="movie"
                                                placeholder="Select Movie"
                                                defaultValue={selectedMovie && selectedMovie.title}
                                                style={{ width: "100%", height: "45px" }}
                                                options={movies.map((movie) => ({
                                                    key: movie._id,
                                                    value: movie._id,
                                                    label: movie.title,
                                                }))}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Ticket Price"
                                            htmlFor="ticketPrice"
                                            name="ticketPrice"
                                            className="d-block"
                                            rules={[
                                                { required: true, message: "Ticket price is required!" },
                                            ]}
                                        >
                                            <Input
                                                id="ticketPrice"
                                                type="number"
                                                placeholder="Enter the ticket price"
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            label="Total Seats"
                                            htmlFor="totalSeats"
                                            name="totalSeats"
                                            className="d-block"
                                            rules={[
                                                { required: true, message: "Total seats are required!" },
                                            ]}
                                        >
                                            <Input
                                                id="totalSeats"
                                                type="number"
                                                placeholder="Enter the number of total seats"
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="d-flex gap-10">
                            <Button
                                className=""
                                block
                                onClick={() => {
                                    setView("table");
                                }}
                                htmlType="button"
                            >
                                <ArrowLeftOutlined /> Go Back
                            </Button>
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                                {view === "form" ? "Add the Show" : "Edit the Show"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal>
        </div>
    )
}

export default ShowModal