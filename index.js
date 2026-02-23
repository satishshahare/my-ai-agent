const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: "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", // paste your real API key here
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AI Assistant</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
    h1 { color: #333; }

    #chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 22px;
      cursor: pointer;
      font-size: 16px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    #chat-box {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 320px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 16px;
      z-index
