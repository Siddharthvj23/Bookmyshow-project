import { axiosInstance } from "./index";




//get all movies
export const getAllMovies = async()=>{
    try {
        const response = await axiosInstance.get('/api/movies/get-movie')
        return response.data       
    } catch (error) {
        console.error(error)
        
    }
}
//add movie

export const addMovie = async (values) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', values)
        return response.data
    } catch (error) {
        console.log(error)
    }

}

//update movie

export const updateMovie  = async (payload)=>{
    try {
        const response = await  axiosInstance.put('/api/movies/update-movie',payload)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

//Delete movie

export const DeleteMovie = async(payload)=>{
    try {
        const response = await axiosInstance.delete('/api/movies/delete-movie',{data:payload})
        return response.data
    } catch (error) {
        console.log(error)
    
    }
}