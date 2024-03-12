import { axiosInstance } from "./index";

//get all theatres
export  const getAllTheatres = async(value) =>{
    try {
        const response = await axiosInstance.get('/api/theatres/get-all-theatres',value)
        return response.data
    } catch (error) {
        return error.response
    }

}

//add theatre

export const addTheatre = async(payload) =>{
    try {
        const response = await axiosInstance.post('/api/theatres/add-theatre',payload)
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

//updated theatre

export const updateTheatre = async(payload)=>{
    try {
        const response = await axiosInstance.put('/api/theatres/update-theatre',payload)
    } catch (error) {
        console.log(error)
        
    }
}