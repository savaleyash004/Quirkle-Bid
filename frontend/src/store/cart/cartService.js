import axios from "axios";
import API_BASE_URL from '../../config';


// export const getAllCities = async () => {
//     const response = await axios.get(`${API_URL}/cities`);
//         //console.log('response cities', response.data);
//         return response.data;
// }{withCredentials:true});


export const getCartItems=async ()=>{
    const response = await axios.get(`${API_BASE_URL}/cart`,{
        withCredentials:true
    });
    //console.log('response cart', response.data);
    return response.data.data;
}

export const deleteCartItem=async(id)=>{
    const response = await axios.delete(`${API_BASE_URL}/cart/${id}`,{
        withCredentials:true
    });
    //console.log('response delete cart', response.data);
    return response.data.data;
}





const cartService= {
    getCartItems,
    deleteCartItem
}


export default cartService;