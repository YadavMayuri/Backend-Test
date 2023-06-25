console.log("hii");

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/allRoutes.js";

const app =express();
app.use(morgan('dev'))
app.use(express.json());
app.use('/api/v1',router);


mongoose.connect('mongodb+srv://mayuriyadav54:HGU1ZbJCNcqlTu0z@cluster0.s9gcceb.mongodb.net/Backend-Test')
.then(()=> console.log("DB connected"))
.catch((err) => console.log("DB error",err))


app.listen(8000, ()=> console.log("working on port 8000"));

