import {axiosInstance} from './index'

export const makepayment = async (token ,amount) => {
    try {
        const response = await axiosInstance.post('/api/bookings/make-payment' , {token,amount})
        return response.data
    } catch (error) {
        return error.response
    }
}

export const bookShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/bookings/book-show', payload);
        console.log(response.data);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const getAllBookings = async () => {
    try{
        const response = await axiosInstance.get('/api/bookings/get-all-bookings', {
            headers:{
                "Content-Type":"application/json",
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }catch(err){
        return err.response;
    }
}