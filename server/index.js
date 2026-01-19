import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user.Route.js"
import productRoutes from "./routes/product.Routes.js";
import categoryRouter from "./routes/categories.Routes.js";
import authRoutes from "./routes/auth.Routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

//MIDDLEWARE 
app.use(cookieParser());
app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
// API routes
app.use("/api", userRoutes);
app.use("/api", productRoutes); //test done
app.use("/api", categoryRouter); //test done
app.use("/api", authRoutes)

//error handlng middleware

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));