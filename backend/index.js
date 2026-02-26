import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import messageRoute from './routes/messageRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import { app, server } from './socket/socket.js';
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
}
app.use(cors(corsOptions));
// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);

const startServer = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
