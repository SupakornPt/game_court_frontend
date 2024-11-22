import axios from "axios";
const URL = import.meta.env.VITE_API_URL

export const createProfile = (profileData, userId, token) => {
    return axios.post(`${URL}/address/${userId}`, profileData, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const getProfile = (userId, token) => {
    return axios.get(`${URL}/address/${userId}`, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}

export const updateProfile = (profileData, userId, token) => {
    return axios.patch(`${URL}/address/${userId}`, profileData, {
        headers: { Authorization: `Bearer' ${token}` }
    })
}