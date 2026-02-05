import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://host:5001/api";

export default axios.create({ baseURL });



