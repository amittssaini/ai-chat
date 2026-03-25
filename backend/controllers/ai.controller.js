import dotenv from 'dotenv'
dotenv.config();



async function aiCall(prompt) {
//console.log("api key ",process.env.API_KEY);
  try {
    console.log("AI call started with prompt :: ", prompt);

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
              content: prompt,
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
        //console.log(data)
    return data.choices[0].message.content;

  } catch (error) {
    console.error("AI Service Error:", error.message);

    // Re-throw so controller can handle
    throw new Error("Failed to get AI response");
  }
}



const postAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const output = await aiCall(prompt); 
   console.log("response is :: ",output)
    res.status(200).json({ answer: output });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
};




export default postAI;
