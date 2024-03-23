import React, { useEffect, useState } from 'react'
import { showloading, hideloading } from '../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllMovies } from '../apicalls/movies'
import { Col, Input, Row, message } from 'antd'
import { SearchOutlined } from "@ant-design/icons"
import moment from "moment";

function Home() {

  const [movies, setMovies] = useState([])
  const [searchText, setSearchText] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      dispatch(showloading())
      const response = await getAllMovies()
      if (response.success) {
        setMovies(response.data)
      } else {
        message.error(response.message)
      }
      dispatch(hideloading())
    } catch (error) {
      message.error(error.message)
      dispatch(hideloading())
    }
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div className='home-body'>
      
        <Row className='Search-container'>
          <Col xs={{ span: 12 }} lg={{ span: 6 }}>
            <Input
              placeholder='Type here to search for movie'
              onChange={handleSearch}
              prefix={<SearchOutlined />} />
            <br />
            <br />
            <br />
          </Col>
        </Row>
        <Row className='Movie-container'>
          {movies &&
            movies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase())
            ).map((movie) => (
              <Col
                key={movie._id}>
                <div>
                  <img
                    onClick={() => {
                      navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
                    }}
                    src={movie.poster}
                    alt='Movie Poster'
                    width={200}
                    style={{ borderRadius: "8px" }} />
                  <h3
                    onClick={() => {
                      navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)
                    }} className='Movie-title-container'>{movie.title}</h3>
                </div>
              </Col>
            ))}

        </Row>

      </div></>
  )
}

export default Home