const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: "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", // paste your real key here
});

app.get("/", (req, res) => {
  res.send("<h1>AI Agent is Running!</h1>");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: "You are a helpful assistant for my website.",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.json({ reply: "Sorry, something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Agent running on port ${PORT}`);
});
