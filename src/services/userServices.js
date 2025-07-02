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


// get allmuscle groups----------------**
// export const getAllMuscleAPI = async()=>{

//     try {

//         const result =await axios.get(`${server_url}/musclegroups`, {withCredentials: true})
//         return result
        
//     } catch (error) {
//         console.log(error);
//         throw error
        
        
//     }

// }


// Get Report API 
export const getAllReportAPI =async () => {
    try {

        const result =await axios.get(`${server_url}/report`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// GET ALL WORKOUT (MUSCLE GROUPS)
export const getAllWorkoutsAPI =async () => {
    try {

        const result =await axios.get(`${server_url}/workout`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// GET Exercise by workout id from parameters 
export const getExerciseByIdAPI =async (id) => {
    try {
        const result =await axios.get(`${server_url}/workout/${id}`, {withCredentials:true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// add Calorie intake
export const addCalorieIntakeAPI = async (CalorieDataEntries) => {
    
    try {
        
        const result =await axios.post(`${server_url}/addcalorie`, CalorieDataEntries , {withCredentials: true} )
        return result
        
    } catch (error) {
       console.log(error);
       throw error
    }
}


// Get Calorie by limit 
export const getCalorieByLimitAPI = async (limit) => {

    try {

        const result =await axios.post(`${server_url}/caloriebylimit`, limit , {withCredentials: true} )
        return result
        
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
    
}


// get Calorie by Date 
export const getCalorieByDateAPI = async (jsonDate) => {
    try {

        const result =await axios.post(`${server_url}/caloriebydate`, {date: jsonDate}, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error 
        
    }
}


// add sleep
export const addSleepAPI = async (sleepEntries) => {
    try {
        const result =await axios.post(`${server_url}/addsleep`, sleepEntries, {withCredentials: true})
        return result
    } catch (error) {
        console.log(error);
        throw error 
    }
}


// get sleep by date api
export const getSleepByDateAPI = async (jsonDate) => {
    try {

        const result =await axios.post(`${server_url}/sleepbydate`, {date: jsonDate}, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error 
        
    }
}


// get sleep by limit api
export const getSleepByLimitAPI = async (limit) => {

    try {

        const result =await axios.post(`${server_url}/sleepbylimit`, limit , {withCredentials: true} )
        return result
        
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
    
}

// add Water API
export const addWaterAPI = async (waterEntries) => {
    try {
        const result =await axios.post(`${server_url}/addwater`, waterEntries, {withCredentials: true})
        return result
    } catch (error) {
        console.log(error);
        throw error 
    }
}

// getWaterbylimitApi
export const getWaterByLimitAPI = async (limit) => {

    try {

        const result =await axios.post(`${server_url}/getwaterbylimit`, limit , {withCredentials: true} )
        return result
        
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
    
}

// get water by date api
export const getWaterByDateAPI = async (jsonDate) => {
    try {

        const result =await axios.post(`${server_url}/getwaterbydate`, {date: jsonDate}, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error 
        
    }
}

// add weight api
export const addWeightAPI = async (weightEntries) => {
    try {
        const result =await axios.post(`${server_url}/addweight`, weightEntries, {withCredentials: true})
        return result
    } catch (error) {
        console.log(error);
        throw error 
    }
}



