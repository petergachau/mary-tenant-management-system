import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";
import milestone from './routes/milestone.js'
import caretaker from './routes/caretaker.js'
import users from './routes/admin.js'
import analysis from './routes/admin.js'
import mile from './routes/admin.js'


const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/project", tourRouter);
app.use('/milestone', milestone)
app.use('/caretaker', caretaker)
app.use('/stats', users)
app.use('/stats', analysis)
app.use('/stats', mile)
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
