// const {axiosInstance} = require('./index')
import { axiosInstance } from "./index"

//register  a user
export const RegisterUser = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/users/register',value)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
