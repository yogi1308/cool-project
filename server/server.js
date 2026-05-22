import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/chat/free', async (req, res) => {

    console.log("My API Key is:", process.env.OPENROUTER_API_KEY ? "Loaded!" : "MISSING!");
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                // 'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
                // 'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-120b:free',
                messages: [
                    {
                        role: 'user',
                        content: 'What is the meaning of life?',
                    },
                ],
            }),
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('API Error:', error.error.message, error);
            return;
        }
        const result = await response.json();
        const reply = result.choices[0].message
        console.log(result.choices[0])
        console.log(reply);
        res.send(reply)
    }
    catch (error) {
        console.error("Network error:", error)
    }
})

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Listening on port ${PORT}!`);
});

