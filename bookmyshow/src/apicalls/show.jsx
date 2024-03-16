import  { axiosInstance } from "./index";

export const addShow = async(payload)=>{
    try {
        const response = await axiosInstance.post('/api/shows/add-show',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const updateShow = async(payload)=>{
    try {
        const response = await axiosInstance.put('/api/shows/update-show',payload)
        return response.data
    } catch (error) {
        return error.message
    }
}

export const deleteShow = async(payload)=>{
    try {
        const response = await axiosInstance.delete('/api/shows/delete-show',{data:payload})
        return response.data
    } catch (error) {
        return error.message
    }
} 

export const getShowsByTheatre = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-theatre', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

