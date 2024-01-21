// Import necessary modules and configurations
import express from "express"; // Import the Express framework
import mongoose from "mongoose"; // Import the Mongoose library for working with MongoDB
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { notesRouter } from "./routes/notes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

// Create an Express application
const app = express();

app.use(express.json());
app.use(
  cors({
    // origin: "https://notes-app-frontend-seven.vercel.app",
    // origin: true,
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", userRouter);
app.use("/notes", notesRouter);

// Define a simple route that responds with a message and a status code
app.get("/", (req, res) => {
  return res.status(234).send("Default route"); // Respond with a status code 234 and a message
});

// Connect to the MongoDB database and start the Express application
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}`);
});
