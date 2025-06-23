import axios from 'axios'

let serverURL = "http://localhost:4000"


export const registerAPI = async(userData) =>{
    try {

        const res =await axios.post(`${serverURL}/register`, userData);
        return res.data
        
        
    } catch (error) {
        console.log(error);
             
    }
}