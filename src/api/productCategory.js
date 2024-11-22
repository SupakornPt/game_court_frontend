import axios from "axios";
const URL = import.meta.env.VITE_API_URL

export const getProductCategory = () => {

    return axios.get(`${URL}/getcategory`);
}

export const getProductByCategory = (id) => {

    return axios.get(`${URL}/searchbycategory/${id}`);
}

export const getProductDetail = (id) => {

    return axios.get(`${URL}/productdetail/${id}`);
}
