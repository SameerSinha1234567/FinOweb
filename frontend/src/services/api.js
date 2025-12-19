import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" // correct
});

// Assets
export const fetchAssets = (accountId) => API.get(`/assets/${accountId}`);
export const addAsset = (data) => API.post("/asset/add", data);
  
export const updateAsset = (id, data) =>  API.put(`/asset/update/${id}`, data);
export const deleteAsset = (id) =>  API.delete(`/asset/delete/${id}`);

// Liabilities
export const fetchLiabilities = (accountId) => API.get(`/liabilities/${accountId}`);
export const addLiability = (data) =>  API.post("/liability/add", data);
export const updateLiability = (id, data) => API.put(`/liability/update/${id}`, data);
export const deleteLiability = (id) => API.delete(`/liability/delete/${id}`);

export const fetchQuestions = (accountId) => API.get(`/planning/questions/${accountId}`);

export default API;


 