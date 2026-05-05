 import express from "express"    // for type:module
// const express = require("express")      // for type:commlyjs
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "../src/routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5006;
const __dirname = path.resolve()

connectDB()

//middleware : this middleware will parse JSON bodies
if(process.env.NODE_ENV !== production){
app.use(
    cors({
origin : "http://localhost:5173"
}));

app.use(express.json());

}

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(procces.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"))
})
}

//What is an Endpoint
//An endpoint is a combination of a URL + HTTP method that
// lets the client interact with a specific resource

connectDB().then( ()=> {
app.listen(PORT, ()=>{
    console.log("Sever started on PORT:", PORT);
    });
});