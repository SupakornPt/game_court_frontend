import axios from "axios";

export const getOrderAllData = (token, userId) => {
    return axios.get(`http://localhost:8888/trackAll/${userId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const searchOrderFn = (token, orderId) => {
    return axios.get(`http://localhost:8888/searchBy/${orderId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

