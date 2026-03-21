import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import http from "http";

dotenv.config();
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 4001;
const server = http.createServer(app);


const startServer = async () => {
  try {
    await connectDB();

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

startServer();