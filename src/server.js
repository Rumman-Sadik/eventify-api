import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Mongo connection failed", err);
  process.exit(1);
});
