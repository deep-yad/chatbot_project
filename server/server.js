
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();
const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey:process.env.API_KEY,
});

app.post("/", async (req, res) => {
    const { chats } = req.body;
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "you are Scofield. You can answer some trivial question"
            },
            ...chats,
        ],
    });


    res.json({
        output: chatCompletion.choices[0].message,
    });
})

app.listen(8080, () => {
    console.log("port is listening at port 8080");
})