import express, { Request, Response } from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
const methodOverride = require("method-override");
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE,PUT,OPTION"
  );
  next();
});
const port = 3000;

app.get('/api/v1/:info',async(req, res) => {
    const {info} = req.params;
    const apiKey = process.env.API_KEY
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Act as a dictionary and give sort information about ${info}` ;
    const result = await model.generateContent(prompt);
    res.send(result.response.text());
})
app.get("/", (req: Request, res: Response) => {
  res.send("Express on Vercel");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}.`);
});

export default app;
