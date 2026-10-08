import axios from "axios";

const api = axios.create({
    baseURL: "https://b2b-rfq-marketplace-0vxv.onrender.com/api",
    withCredentials: true
});

export default api;