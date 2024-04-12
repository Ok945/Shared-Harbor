import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

// const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);




const __dirname = path.resolve();
// console.log(__dirname)

app.use('/node-app/uploads', express.static(path.join(__dirname, 'node-app/uploads')));

server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${port}`);
});
