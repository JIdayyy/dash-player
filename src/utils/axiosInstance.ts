import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://wildify-api.digitalcopilote.re/api/v1",
});

export default axiosInstance;
