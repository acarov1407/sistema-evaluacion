import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1`
})

const getConfig = (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    return config;
}

export {
    getConfig
}

export default axiosClient;