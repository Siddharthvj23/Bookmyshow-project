import { useState, useEffect } from 'react'
import { showloading, hideloading } from '../../redux/loaderSlice'
import { Button, Card, Col, Row, message } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllBookings } from '../../apicalls/booking'
import { Link } from 'react-router-dom'
import moment from 'moment'


const booking = () => {
  const [booking, setBooking] = useState([])
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(showloading())
      const response = await getAllBookings()
      if (response.success) {
        setBooking(response.data)

      } else {
        message.error(response.message)
      }
      dispatch(hideloading())
    } catch (error) {
      message.error(error.message)
      dispatch(hideloading())
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      {booking &&
        <Row gutter={24}>
          {booking.map(booking => {
            return <Col key={booking.id} xs={{ span: 24 }} lg={{ span: 112 }}>
              <Card className='booking-inner-card'>
                <div>
                  <div><img src={booking.show.movie?.poster} width={100} alt='Movie Poster' /></div>
                  <div>
                    <p>Theatre: <b>{booking.show.theatre?.name}</b></p>
                    <p>Seats: <b>{booking.seats.join(", ")}</b></p>
                    <p>Date & Time: <b>{moment(booking.show.date).format("MMM Do YYYY")} {moment(booking.show.time, "HH:mm").format("hh:mm A")}</b>  </p>
                    <p>Amount: <b>Rs.{booking.show.bookedSeats.length * booking.show.ticketprice}/- </b></p>
                    <p>Booking ID: <b>{booking.transactionId} </b></p>
                  </div>
                </div>
              </Card>
            </Col>
          })}
        </Row> }
        {!booking.length && 
        <div> 
          <h1>You've not booked any show yet!</h1>
          <Link to="/"><Button>Start Booking</Button></Link>
        </div>
          }
      </div>

  )
}

export default booking