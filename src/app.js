import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

//local imports
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import { HTTP_STATUS } from "./constants/httpStatus.js";
import apiLimiter from "./middlewares/rateLimiter.js";
import userRoutes from "./routes/user.routes.js"
import farmerRoutes from "./routes/farmer.routes.js";

const app = express();


app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

//rate limiter
//app.use("/api/v1/auth", apiLimiter);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FreshAm API is running.",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
    });
});

//routes
app.use("/api/v1/auth", authRoutes);
//import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/user", userRoutes);
//import farmerRoutese 
app.use("/api/v1/farmers", farmerRoutes);




app.use((req, res, next) => {
    next(
        new AppError(
            `Route ${req.originalUrl} not found.`,
            HTTP_STATUS.NOT_FOUND
        )
    );
});


// global error handler
app.use(errorHandler);


export default app;