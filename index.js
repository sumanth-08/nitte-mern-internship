import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import router from "./routes.js";
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Failed to connect DB", err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
router(app);

app.listen(PORT, () => {
  console.log("Server runninng on port", PORT);
});
