import axios from "axios";

export const register = (form) => {

    return axios.post("http://localhost:8888/register", form);
}

export const login = (form) => {

    return axios.post("http://localhost:8888/login", form);
}
