import axios from "axios";
const URL = import.meta.env.VITE_API_URL

export const createOrder = (data, token) => {

    return axios.post(`${URL}/createorder`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const getBankOption = (token) => {

    return axios.get(`${URL}/paymentmethod`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const getOrderData = (orderId, token) => {
    return axios.get(`${URL}/orderdata/${orderId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const createPayment = (orderId, token, body) => {
    return axios.post(`${URL}/createpayment/${orderId}`, body, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const updatePayment = (orderId, token, body) => {
    return axios.patch(`${URL}/updatepayment/${orderId}`, body, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}