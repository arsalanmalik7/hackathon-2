import axios from "axios";

const isProduction = window.location.href.includes("https");

const baseUrl = isProduction ? "" : "http://localhost:3001";

export const instance = axios.create({
    baseURL: `${baseUrl}/api`,

});