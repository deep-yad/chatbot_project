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
    console.log(chats);
    const chatCompletion = await openai.completions.create({
        model: "text-davinci-003",
        prompt:chats,
    });
    res.send(chatCompletion.choices[0].text);
})

app.listen(3000, () => {
    console.log("port is listening at port 3000");
})