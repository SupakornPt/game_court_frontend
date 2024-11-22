import axios from "axios";

export const createOrder = (data, token) => {

    return axios.post("http://localhost:8888/createorder", data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export const getBankOption = (token) => {

    return axios.get(`http://localhost:8888/paymentmethod`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const getOrderData = (orderId, token) => {
    return axios.get(`http://localhost:8888/orderdata/${orderId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const createPayment = (orderId, token, body) => {
    return axios.post(`http://localhost:8888/createpayment/${orderId}`, body, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const updatePayment = (orderId, token, body) => {
    return axios.patch(`http://localhost:8888/updatepayment/${orderId}`, body, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}