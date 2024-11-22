import axios from "axios";

export const getProductCategory = () => {

    return axios.get("http://localhost:8888/getcategory");
}

export const getProductByCategory = (id) => {

    return axios.get(`http://localhost:8888/searchbycategory/${id}`);
}

export const getProductDetail = (id) => {

    return axios.get(`http://localhost:8888/productdetail/${id}`);
}
