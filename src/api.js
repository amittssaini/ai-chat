import axios from "axios";

const API = axios.create({
 baseURL: "https://ai-chat-rxzk.onrender.com/api/", // deploy render sever 
 //baseURL:"http://localhost:8084/api/", //local server 
});

export const askAI = (prompt) => API.post("/ask-ai", { prompt });

export const saveData = (data) => API.post("chat/save", data);
export const historyChat=()=>API.get("chat/history")
export const getHistoryById = (id) =>API.get(`chat/history/${id}`);