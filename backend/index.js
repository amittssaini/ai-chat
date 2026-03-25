console.log("hello world i am doing backend")
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import aiRouter from './routes/ai.route.js'
import chatRouter from "./routes/chat.route.js"
import mongoose from 'mongoose';




const app = express();
dotenv.config();

const DB_URL= process.env.DB_URL;
console.log(DB_URL);

mongoose
.connect(DB_URL)
.then(()=>console.log("db is connected"))
.catch((error)=>console.log("db is not connected ",error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use("/api/ask-ai",aiRouter);
app.use("/api/chat",chatRouter)





// app.post("/api/ask-ai", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "google/gemma-3n-e2b-it:free",
//         messages: [{ role: "user", content: prompt }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "http://localhost:5173",
//           "X-OpenRouter-Title": "AI-CHAT",
//         },
//       }
//     );

//     const aiAnswer = response.data.choices[0].message.content;

//     res.json({ answer: aiAnswer });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "AI request failed" });
//   }
// });




// async function aiCall(){
//     console.log("function ai call");
//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${process.env.API_KEY} `, // Optional. Site title for rankings on openrouter.ai.
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     "model": "liquid/lfm-2.5-1.2b-thinking:free",
//     "messages": [
//       {
//         "role": "user",
//         "content": "What is the Lawn Tennis ?"
//       }
//     ]
//   })
// });
// const data = await response.json();
// //console.log(response);
// console.log("*************************");
// //console.log(data);
// console.log("***************************")
// console.log(data.choices[0].message.content);
// }

//aiCall();

// fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${process.env.API_KEY} `, // Optional. Site title for rankings on openrouter.ai.
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     "model": "liquid/lfm-2.5-1.2b-thinking:free",
//     "messages": [
//       {
//         "role": "user",
//         "content": "What is the meaning of life?"
//       }
//     ]
//   })
// });

// app.post("/api/ask-ai", async (req, res) => {
//   const { prompt } = req.body;

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "minimax/minimax-m2.5:free",
//         messages: [
//           { role: "user", content: prompt }
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": "http://localhost:5173",
//           "X-OpenRouter-Title": "AI-CHAT",
//         },
//       }
//     );

//     const aiAnswer = response.data.choices[0].message.content;

//     res.json({ answer: aiAnswer });

//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "AI request failed" });
//   }
// });




async function aiCall() {
console.log("api key ",process.env.API_KEY);
  try {
    //console.log("AI call started with prompt :: ", prompt);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
          //model:"nvidia/nemotron-3-super-120b-a12b:free",
          //model:"minimax/minimax-m2.5:free",
          messages: [
            {
              role: "user",
              content: "who is sachin tendulkar",
            },
          ],
        }),
      }
    );

    // ❗ Check HTTP error
    if (!response.ok) {
      const errData = await response.text();
      throw new Error(`API Error: ${response.status} - ${errData}`);
    }

    const data = await response.json();
        console.log(data)
     console.log(data.choices[0].message.content);

  } catch (error) {
    console.error("AI Service Error:", error.message);

  
  }
}

//aiCall();