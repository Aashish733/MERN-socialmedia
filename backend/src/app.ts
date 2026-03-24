import cookieParser from 'cookie-parser';
import express from 'express'
import cors from "cors";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";

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
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute)
app.use("/api/v1/comments", commentRoute);




export default app;