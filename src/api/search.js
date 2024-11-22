import axios from "axios";
const URL = import.meta.env.VITE_API_UR

export const searchText = (search) => {

    return axios.get(`${URL}/search?value=${search}`);
}

export const searchFilter = (filter) => {
    return axios.get(`${URL}/searchbyfilter`, { params: filter })
}