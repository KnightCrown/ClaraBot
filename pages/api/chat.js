// pages/api/chat.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }
  
    try {
      console.log("User message:", message);  // 🪵 Add this
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful mental health assistant." },
            { role: "user", content: message },
          ],
        }),
      });
  
      const data = await response.json();
      console.log("OpenAI response:", data);  // 🪵 Add this
  
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      res.status(200).json({ reply });
  
    } catch (error) {
      console.error("OpenAI API error:", error);  // 🪵 Add this
      res.status(500).json({ error: "Something went wrong" });
    }
  }
  