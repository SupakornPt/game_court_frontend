import axios from "axios";
const URL = import.meta.env.VITE_API_URL

export const register = (form) => {

    return axios.post(`${URL}/register`, form);
}

export const login = (form) => {

    return axios.post(`${URL}/login`, form);
}
