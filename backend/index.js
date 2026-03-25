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