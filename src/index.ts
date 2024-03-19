import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app:Express = express();

const PORT = process.env.PORT || 8080


app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ "message": "hi"})
})


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})