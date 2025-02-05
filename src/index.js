import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";


dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
    });
}

app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
}));




app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, ()=>{
    console.log("server is running on port", PORT);
    connectDB();
});