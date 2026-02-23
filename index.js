const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: "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", // paste your key here
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: "You are a helpful assistant for my website. Answer customer questions politely.",
    messages: [{ role: "user", content: userMessage }],
  });

  res.json({ reply: response.content[0].text });
});

app.listen(3000, () => {
  console.log("AI Agent running on port 3000");
});