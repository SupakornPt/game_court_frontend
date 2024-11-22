import axios from "axios";
const URL = import.meta.env.VITE_API_UR

export const getOrderAllData = (token, userId) => {
    return axios.get(`${URL}/trackAll/${userId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const searchOrderFn = (token, orderId) => {
    return axios.get(`${URL}/searchBy/${orderId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

