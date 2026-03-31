import axios from "axios";

const API = axios.create({
  baseURL: "https://loan-backend-687w.onrender.com"
});

export default API;