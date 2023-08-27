import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import User from "../models/User.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/search/getAllBooking", verifyAdmin, getAllBooking);
export default router;
