import axios from 'axios'

let serverURL = "http://localhost:4000"

// register API
export const registerAPI = async(userData) =>{
    try {

        const res =await axios.post(`${serverURL}/register`, userData);
        return res.data
        
        
    } catch (error) {
        console.log(error);
             
    }
}

// LOGIN API
export const loginAPI = async(credentials)=>{
    try {

        const response = await axios.post(`${serverURL}/login`, credentials, {
            withCredentials: true
        })
        return response.data
        
    } catch (error) {
        console.log(error);    
        
    }
}


// VERIFY TOKEN API
export const verifyTokenAPI = async () =>{
    try {

        const response = await axios.get(`${serverURL}/verifytoken`, {withCredentials: true})
        return response.data.valid
        
    } catch (error) {

        console.log(error);
        
        
    }
}


// LOGOUT USER API

export const logoutUserApi = async()=>{
    try {

        await axios.get(`${serverURL}/logout`, {withCredentials: true})
        
    } catch (error) {
        console.log(error);
        
    }
}