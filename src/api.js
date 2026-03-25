import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8084/api",
});

export const askAI = (prompt) => API.post("/ask-ai", { prompt });

export const saveData = (data) => API.post("chat/save", data);
export const historyChat=()=>API.get("chat/history")
export const getHistoryById = (id) =>API.get(`chat/history/${id}`);