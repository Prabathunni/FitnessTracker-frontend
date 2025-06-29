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

// VERIFY TOKEN API for entire website
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


// Get Report API 
export const getAllReportAPI =async () => {
    try {

        const result = axios.get(`${server_url}/report`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// GET ALL WORKOUT (MUSCLE GROUPS)
export const getAllWorkoutsAPI =async () => {
    try {

        const result = axios.get(`${server_url}/workout`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// GET Exercise by workout id from parameters 
export const getExerciseByIdAPI =async (id) => {
    try {
        const result = axios.get(`${server_url}/workout/${id}`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// add Calorie intake
export const addCalorieIntakeAPI = async (CalorieDataEntries) => {
    
    try {
        
        const result = axios.post(`${server_url}/addcalorie`, CalorieDataEntries , {withCredentials: true} )
        return result
        
    } catch (error) {
       console.log(error);
       throw error
    }
}


// Get Calorie by limit 
export const getCalorieByLimitAPI = async (limit) => {

    try {

        const result = axios.post(`${server_url}/caloriebylimit`, limit , {withCredentials: true} )
        return result
        
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
    
}
