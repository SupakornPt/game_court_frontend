import axios from "axios";


export const createProfile = (profileData, userId, token) => {
    return axios.post(`http://localhost:8888/address/${userId}`, profileData, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const getProfile = (userId, token) => {
    return axios.get(`http://localhost:8888/address/${userId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const updateProfile = (profileData, userId, token) => {
    return axios.patch(`http://localhost:8888/address/${userId}`, profileData, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}