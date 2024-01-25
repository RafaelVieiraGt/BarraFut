import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-barra-futs.vercel.app"
})

export default api