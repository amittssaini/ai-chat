# 🤖 Ask AI Flow App

A modern **MERN + React Flow** based web application where users can input prompts, get AI-generated responses, and visualize the flow between input and output nodes.

---

## 🚀 Features

✨ Interactive flow-based UI using React Flow
🧠 AI-powered responses via backend API
💾 Save prompts & responses to MongoDB
📜 History sidebar with clickable prompts
⚡ Real-time loading spinner for better UX
🎨 Beautiful UI with Tailwind CSS

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* Tailwind CSS
* React Flow
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* OpenRouter API (AI)

---



## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/amittssaini/ai-chat.git
cd ask-ai-chat
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
OPENROUTER_API_KEY=your_api_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd ai-chat
npm install
npm run dev
```

---

## 🔌 API Endpoints

### 🔹 Ask AI

```
POST /api/ask-ai
```

### 🔹 Save Chat

```
POST /api/chat/save
```

### 🔹 Get History

```
GET /api/chat/history
```

### 🔹 Get Chat by ID

```
GET /api/chat/history/:id
```

---

## 🧠 How It Works

1. User enters a prompt in the input node
2. Clicks **Run Flow**
3. Frontend sends request to backend
4. Backend calls AI API
5. Response is displayed in result node
6. User can save or revisit history

---

## 🎯 UI Highlights

* 🌈 Gradient Navbar
* 📂 Right-side History Sidebar
* 🔄 Loading Spinner (Thinking state)
* 🧩 Flow-based Node Interface

---

## 📁 Project Structure

```
 ai-chat/
 ├── src/
 │   ├── components/
 │   ├── App.jsx
 │   ├── api.js

backend/
 ├── routes/
 ├── controllers/
 ├── models/
```

---

## 🚀 Future Improvements

* 🔍 Search in history
* 🗑 Delete history
* ✨ Typing animation (ChatGPT style)
* 🌙 Light/Dark mode toggle
* 📱 Mobile responsiveness

---

## 📦 Deployment

* Frontend → Vercel
* Backend → Render

---

## 👨‍💻 Author

**Amit Saini**

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
