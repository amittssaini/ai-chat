import dotenv from 'dotenv'
dotenv.config();

async function aiCall(prompt) {
  try {
    console.log("AI call started with prompt :: ", prompt);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "arcee-ai/trinity-large-preview:free",
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

    res.json({ answer: output });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
};




export default postAI;
