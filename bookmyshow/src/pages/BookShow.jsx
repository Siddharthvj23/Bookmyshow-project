import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showloading, hideloading } from '../redux/loaderSlice'
import { getShowById } from '../apicalls/show'
import { useNavigate, useParams } from 'react-router-dom'
import { message, Card, Row, Col, Button } from 'antd'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import { bookShow,makepayment } from '../apicalls/booking'

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
        let columns = 12
        let TotalSeats = show.totalSeats
        let rows = Math.ceil(TotalSeats / columns)

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

                            if (selectedSeats.includes(seatNumber)) {
                                seatClass += ' selected'
                            }
                            if (show.bookedSeats.includes(seatNumber)) {
                                seatClass += ' booked'
                            }

                            if (seatNumber <= TotalSeats)
                                return (
                                    <li>
                                        <button
                                            className={seatClass}
                                            onClick={() => {
                                                if (selectedSeats.includes(seatNumber)) {
                                                    setSelectedSeats(
                                                        selectedSeats.filter((curSeatNumber) => curSeatNumber !== seatNumber)
                                                    )
                                                } else {
                                                    setSelectedSeats([...selectedSeats, seatNumber])
                                                }
                                            }}>
                                            {seatNumber}
                                        </button>
                                    </li>
                                )
                        })
                    })}
                </ul>
                <div className="bottom-card">
                    <div>
                        Selected Seats: <span>{selectedSeats.join(", ")}</span>
                    </div>
                    <div>
                        Total Price:{" "}
                        <span>Rs. {selectedSeats.length * show.ticketprice}</span>
                    </div>
                </div>
            </div>
        );
    };

    const book = async (transactionId)=>{
        try{
            dispatch(showloading());
            const response = await bookShow({show: params.id, transactionId, seat: selectedSeats, user: user._id});
            console.log(response)
            if(response.success){
                message.success("Show Booking done!");
                navigate("/profile");
            }else{
                message.error(response.message);
            }
            dispatch(hideloading());
        }catch(err){
            message.error(err.message)
            dispatch(hideloading());
        }
    
    }
    const onToken= async (token) =>{
         try {
            dispatch(showloading())
            const response = await makepayment(token, selectedSeats.length * show.ticketprice * 100)
            if(response.success){
                message.success(response.message)
                book(response.data)
        
            }else{
                message.error(response.message)
            }
            dispatch(hideloading())
         } catch (error) {
            message.error(response.message)
            dispatch(hideloading())
         }
    }
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
                            style={{ width: '100%' }}

                        >{getSeats()}

                        {selectedSeats.length > 0 && <StripeCheckout token={onToken} billingAddress amount={selectedSeats.length * show.ticketprice * 100}
                                stripeKey='pk_test_51OwMveSCBWExgHuK92erGllMEA7uu15iZsRQPWYXYPakWfDv3hUWkwjp2hr7HQka6NYGq4lAcVRSzQe7R8V1DtGu00i4T6kyUh'>
                                <div className=' max-w-xl mx-auto'>
                                    <Button shape='round' size='large' block>
                                        Pay Now 
                                    </Button>
                                </div>    
                            </StripeCheckout>}
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default BookShow