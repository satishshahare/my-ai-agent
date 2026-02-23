const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Serve HTML directly - no public folder needed!
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AI Assistant</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }

    #chat-box {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 16px;
      z-index: 9999;
      display: none;
    }

    #chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      cursor: pointer;
      font-size: 16px;
      z-index: 9999;
    }

    #messages {
      height: 250px;
      overflow-y: auto;
      margin-bottom: 10px;
      border: 1px solid #eee;
      padding: 8px;
      border-radius: 8px;
    }

    .user-msg { text-align: right; color: blue; margin: 4px 0; }
    .ai-msg { text-align: left; color: green; margin: 4px 0; }

    #chat-input {
      width: 70%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    #chat-send {
      width: 25%;
      padding: 8px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <h1>Welcome! AI Assistant is Ready 🤖</h1>
  <p>Click the chat button below to start!</p>

  <button id="chat-toggle" onclick="toggleChat()">💬 Chat</button>

  <div id="chat-box">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="margin:0;">💬 AI Assistant</h3>
      <span onclick="toggleChat()" style="cursor:pointer; font-size:18px;">✖</span>
    </div>
    <br/>
    <div id="messages"></div>
    <input type="text" id="chat-input" placeholder="Ask me anything..." />
    <button id="chat-send" onclick="sendMessage()">Send</button>
  </div>

  <script>
    function toggleChat() {
      const box = document.getElementById("chat-box");
      const btn = document.getElementById("chat-toggle");
      if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
        btn.style.display = "none";
      } else {
        box.style.display = "none";
        btn.style.display = "block";
      }
    }

    async function sendMessage() {
      const input = document.getElementById("chat-input");
      const messages = document.getElementById("messages");
      const userMessage = input.value;
      if (!userMessage) return;

      messages.innerHTML += '<div class="user-msg">You: ' + userMessage + '</div>';
      input.value = "";

      messages.innerHTML += '<div class="ai-msg" id="typing">AI: typing...</div>';
      messages.scrollTop = messages.scrollHeight;

      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      document.getElementById("typing").remove();
      messages.innerHTML += '<div class="ai-msg">AI: ' + data.reply + '</div>';
      messages.scrollTop = messages.scrollHeight;
    }

    document.getElementById("chat-input").addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });
  </script>

</body>
</html>
  `);
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: "You are a helpful assistant for my website. Answer customer questions politely.",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    res.json({ reply: "Sorry, something went wrong. Please try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Agent running on port ${PORT}`);
});
