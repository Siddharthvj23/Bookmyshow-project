
import { axiosInstance } from "./index"

//register  a user
export const RegisterUser = async(value)=>{
    try {
        const response = await axiosInstance.post('/api/users/register',value)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//login user

export const LoginUser = async (value) =>{
    try {
        const response = await axiosInstance.post("/api/users/login" ,value)
        return response.data
    } catch (error) {
        console.log(err);
    }
}

//get current user from frontend
export const GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get("/api/user/get-current-user")
        return response.data
    } catch (error) {
        console.log(error)
        
    }
}

