import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import routeAuth from "./routes/auth.js";
import routeMessage from "./routes/message.js";
import routeUser from "./routes/user.js";

import connectToMongoDB from "./database/connectToMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
// const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json()); // to parse JSON input payloads from req.body
app.use(cookieParser()); //middleware to access cookies

// app.get("/", (req, res) => {
//    // root route https://locallhost.com:5011/
//    res.send("Happy Chatting!");
// });

app.use("/auth", routeAuth);
app.use("/message", routeMessage);
app.use("/users", routeUser);



app.listen(PORT, () => {
    connectToMongoDB();   
    console.log(`server running on port number ${PORT}`);
}
)