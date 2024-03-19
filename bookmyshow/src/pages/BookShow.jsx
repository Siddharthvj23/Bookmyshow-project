import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showloading, hideloading } from '../redux/loaderSlice'
import { getShowById } from '../apicalls/show'
import { useNavigate, useParams } from 'react-router-dom'
import { message, Card, Row, Col, Button } from 'antd'
import moment from 'moment'

const BookShow = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [show, setShow] = useState()
    const [selectedSeats, setSelectedSeats] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            dispatch(showloading())
            const response = await getShowById({ showId: params.id })
            console.log(response)
            if (response.success) {
                setShow(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(hideloading())
        } catch (error) {
            message.error(error.message)
            dispatch(hideloading())

        }
    }

    const getSeats = () => {
        let columns = 10
        let TotalSeats = 200
        let rows = TotalSeats / columns

        return (
            <div className='seats-container'>
                <div>
                    <p className='screen-p'>
                        Screen is this side, you will be watching in this direction
                    </p>
                    <div className='screen'></div>
                </div>
                <ul className='seat-ul'>
                    {Array.from(Array(rows).keys()).map((row) => {
                        return Array.from(Array(columns).keys()).map((column) => {
                            let seatNumber = row * columns + column + 1
                            
                            let seatClass = 'seat-btn'

                            if(seatNumber <= TotalSeats)
                                return(
                                    <li>
                                        <button className={seatClass}></button>
                                    </li>
                                    )
                        })
                    })}
                </ul>
            </div>
        )
    }
    console.log(getSeats())
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            {show && (
                <Row gutter={24}>
                    <Col gutter={24}>
                        <Card
                            title={
                                <div className='movie-title-details'>
                                    <h1>{show.movie.title}</h1>
                                    <p>
                                        Theatre: {show.theatre.name}, {show.theatre.address}
                                    </p>
                                </div>
                            }
                            extra={
                                <div className='show-name'>
                                    <h3>
                                        <span>Show Name:</span> {show.name}
                                    </h3>
                                    <h3>
                                        <span>Date & Time: </span>
                                        {moment(show.date).format("MMM Do YYYY")} at{" "}
                                        {moment(show.time, "HH:mm").format("hh:mm A")}
                                    </h3>
                                    <h3>
                                        <span>Ticket Price:</span> Rs. {show.ticketprice}/-
                                    </h3>
                                    <h3>
                                        <span>Total Seats:</span> {show.totalSeats}
                                        <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                                        {show.totalSeats - show.bookedSeats.length}{" "}
                                    </h3>
                                </div>
                            }
                            style={{width: '100%'}}
                            
                        >{getSeats()}</Card>
                </Col>
                </Row>
            )}
        </>
    )
}

export default BookShow