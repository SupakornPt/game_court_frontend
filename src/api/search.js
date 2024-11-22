import axios from "axios";

export const searchText = (search) => {

    return axios.get(`http://localhost:8888/search?value=${search}`);
}

export const searchFilter = (filter) => {
    return axios.get("http://localhost:8888/searchbyfilter",{params:filter})
}