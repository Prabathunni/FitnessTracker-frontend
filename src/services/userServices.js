import axios from 'axios'

let server_url = "http://localhost:4000"

// register API
export const registerAPI = async(userData) =>{
    try {

        const res =await axios.post(`${server_url}/register`, userData);
        return res.data
        
        
    } catch (error) {
        console.log(error);
        throw error
             
    }
}

// LOGIN API
export const loginAPI = async(credentials)=>{
    try {

        const result = await axios.post(`${server_url}/login`, credentials, {
            withCredentials: true
        })
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// VERIFY TOKEN API
export const verifyTokenAPI = async () =>{
    try {

        const response = await axios.get(`${server_url}/verifytoken`, {withCredentials: true})
        return response.data.valid
        
    } catch (error) {

        console.log(error);
        throw error
                
    }
    
}


// LOGOUT USER API
export const logoutUserApi = async()=>{
    try {

        await axios.get(`${server_url}/logout`, {withCredentials: true})
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
}

// get allmuscle groups
export const getAllMuscleAPI = async()=>{

    try {

        const result = await axios.get(`${server_url}/musclegroups`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
        
        
    }

}