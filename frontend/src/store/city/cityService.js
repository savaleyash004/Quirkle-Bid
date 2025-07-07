import axios from "axios";
import API_BASE_URL from '../../config';


export const getAllCities = async () => {
    const response = await axios.get(`${API_BASE_URL}/cities`);
        //console.log('response cities', response.data);
        return response.data;
}

//get top cities by user
export const getTopCitiesByUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/users/top-cities`,{
        withCredentials:true
    });
        //console.log('response top cities', response.data);
        return response.data;
}








const cityService= {
    getAllCities,
    getTopCitiesByUser,
}


export default cityService;