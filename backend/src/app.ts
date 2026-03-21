import cookieParser from 'cookie-parser';
import express from 'express'
import cors from "cors";
import testRoute from "./routes/testRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

//routes
app.use("/api/v1/test", testRoute);



export default app;