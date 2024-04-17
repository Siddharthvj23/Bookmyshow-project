import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieById } from '../apicalls/movies'
import { useDispatch } from 'react-redux'
import { showloading, hideloading } from '../redux/loaderSlice'
import { Col, Row, message, Input, Divider } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import moment from "moment"
import { getAllTheatresByMovie } from '../apicalls/show'


const SingleMovie = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [movie, setMovie] = useState()
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [theatres,setTheatres] = useState([])

    const handleDate = (e) => {
        setDate(moment(e.target.value).format("YYYY-MM-DD"))
        navigate(`/movie/${params.id}?date=${e.target.value}`)
    }

    const getData = async () => {
        try {
            dispatch(showloading())
            const response = await getMovieById(params.id)
            console.log(params.id)
            if (response.success) {
                setMovie(response.data)
                console.log(response.data)
            } else {
                message.error(response.message)
            }
            dispatch(hideloading())
        } catch (error) {
            message.error(error.message)
            dispatch(hideloading())
        }
    }

    const getAllTheatres = async () =>{
        try {
            dispatch(showloading())
            const response = await getAllTheatresByMovie({movie: params.id,date })
            if(response.success){
                setTheatres(response.data)
            }else{
                message.error(response.message)
            }
            dispatch(hideloading())
        } catch (error) {
            dispatch(hideloading())
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getAllTheatres()
    }, [date])
    return (
    <>
        <div className="Movie-inner-container">
            {movie && (
                <div >
                    <div className='Movie-inner-container-poster' >
                       <img src={movie.poster} width={150} alt="Movie Poster" />
                    </div>
                    <div className='Movie-inner-container-data'>
                        <h1 className='movie-title'>{movie.title}</h1>
                        <p >
                            Language: <span>{movie.language}</span>
                        </p>
                        <p >
                            Genre: <span>{movie.genre}</span>
                        </p>
                        <p >
                            Release Date:{" "}
                            <span>{moment(movie.date).format("MMM Do YYYY")}</span>
                        </p>
                        <p >
                            Duration: <span>{movie.duration} Minutes</span>
                        </p>
                        <hr />

                        <div className='date-container'>
                            <label >Choose the date:</label>
                            <Input
                                onChange={handleDate}
                                type="date"
                                
                                value={date}
                                placeholder="default size"
                                prefix={<CalendarOutlined />}
                            />
                        </div>
                    </div>
                </div>
            )}
            {theatres.length ===0 &&(
                <div className=' pt-3'>
                    <h2 className='blue-color'> Currently, no theatres available for this movie!</h2>
                </div>
            )}
            {theatres.length > 0 &&(
                <div className='theatre-wrapper'>
                    <h2>Theatres :</h2>
                    {theatres.map((theatre)=>{
                        return(
                            <div key={theatre._id}>
                                <Row gutter={24} key={theatre._id}>
                                    <Col xs={{span: 24}} lg={{span: 8}}>
                                        <h3>{theatre.name}</h3>
                                        <p>{theatre.address}</p>
                                    </Col>
                                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                        <ul className='show-ul'>
                                            {theatre.shows
                                            .sort((a,b)=>moment(a.time,"HH:mm")-moment(b.time,"HH:mm"))
                                            .map((singleShow) =>{
                                                return(
                                                    <li
                                                        key={singleShow._id}
                                                        onClick={()=>
                                                            navigate(`/book-show/${singleShow._id}`)}>
                                                                {moment(singleShow.time,"HH:mm").format("hh:m A")}
                                                            </li>
                                                )
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                                <Divider/>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    </>
)    
}

export default SingleMovie