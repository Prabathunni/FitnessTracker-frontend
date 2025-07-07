import axios from 'axios'

const server_url="http://localhost:4000"


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

// get weight by limit api
export const getWeightByLimitAPI = async (limit) => {

    try {

        const result =await axios.post(`${server_url}/getweightbylimit`, limit , {withCredentials: true} )
        return result
        
        
    } catch (error) {
        console.log(error);
        throw error
        
    }
    
}


// get water by date api
export const getWeightByDateAPI = async (jsonDate) => {
    try {

        const result =await axios.post(`${server_url}/getweightbydate`, {date: jsonDate}, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error 
        
    }
}


// get user Details for header
export const getUserDetailsAPI = async()=>{
    try {
        const result = await axios.get(`${server_url}/userfetch`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
            
    }
}


// ________________________admin side
// LOGIN Admin API
export const adminLoginAPI = async(credentials)=>{
    try {

        const result = await axios.post(`${server_url}/loginadmin`, credentials, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// Get ALL Users 
export const getAllUSersAPI = async()=>{
    try {

        const result = await axios.get(`${server_url}/users`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// Get User By ID 
export const getaUSerByIdAPI = async(id)=>{
    try {

        const result = await axios.get(`${server_url}/users/user/${id}`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// delete a user by id
export const deleteUserByidAPI = async(id)=>{
    try {

        const result = await axios.delete(`${server_url}/users/${id}`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}


// Logout Admin 
export const logoutAdminAPI = async()=>{
    try {

        const result = await axios.get(`${server_url}/logoutadmin`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// Get ALL workouts 
export const getAllMucleWorkoutsAPI = async()=>{
    try {

        const result = await axios.get(`${server_url}/workout`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}


// Get Exercises By muscleworkout ID 
export const getAllExercisesByWorkoutIDAPI = async(id)=>{
    try {

        const result = await axios.get(`${server_url}/workout/${id}/exercises`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// add exercis api by workout id
export const addExerciseByWorkoutIdAPI = async (id, exerciseData) => {
    try {
        const result =await axios.post(`${server_url}/workout/${id}`, exerciseData, {withCredentials: true})
        return result
    } catch (error) {
        console.log(error);
        throw error 
    }
}


// delete a exercise by id via workout id
export const deleteAExerciseByIdSAPI = async(workoutId,exerciseId)=>{
    try {

        const result = await axios.delete(`${server_url}/workout/${workoutId}/exercises/${exerciseId}`, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// update a exercise by id via workout id
export const updateAExerciseAPI = async(workoutId,exerciseId, updatedDate)=>{
    try {

        const result = await axios.put(`${server_url}/workout/${workoutId}/exercises/${exerciseId}`, updatedDate, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// update a exercise by id via workout id
export const blockUserAPI = async(userId)=>{
    try {

        const result = await axios.patch(`${server_url}/blockuser`, {userId}, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

// update userDatails
export const updateUserAPI = async(userData)=>{
    try {

        const result = await axios.patch(`${server_url}/updateuser`, userData, {withCredentials: true} )
        return result
        
    } catch (error) {
        console.log("Status:",error.response.status, error.response.data);
        throw error
        
    }
}

















