import { axiosInstance } from "./index";


//get all theatres to admin
export const getAllTheatresToAdmin = async(payload)=>{
    try {
        const response =  await axiosInstance.get('/api/theatres/get-all-theatres',payload)
        return response.data
    } catch (error) {
        return error.response
    }
}

//get all theatres of a specific owner
export  const getAllTheatres = async(payload) =>{
    try {
        const response = await axiosInstance.post('/api/theatres/get-all-theatres-by-owner',payload)
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
        return response.data

    } catch (error) {
        console.log(error)
        
    }
}

//Delete theatre

export const deleteTheatre = async(payload)=>{
    try {
        const response = await axiosInstance.delete('/api/theatres/deleteTheatre',{data:payload})
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}