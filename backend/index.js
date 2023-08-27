import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import mongoose, { connect } from "mongoose";
import colors from "colors";

dotenv.config();
const app = express();
const port = 4000;
const corsOptions = {
  origin: true,
  credentials: true,
};
mongoose.set("strictQuery", false);
//export default async function connectToDB() {
const connectToDB = async () => {
  try {
    const conn = mongoose.connect(
      "mongodb+srv://niloy23:123@cluster0.ti6ovyz.mongodb.net/ludu?retryWrites=true&w=majority"
    );
    console.log(`Connected to MongoDB Database `.bgMagenta.white);
  } catch (err) {
    console.log("MongoDB database connection failed".bgCyan.white);
  }
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
connectToDB();
app.listen(port, () => {
  console.log("server listening on port", port);
});
