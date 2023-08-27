import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
const router = express.Router();
router.post("/", async (req, res) => {
  const { userData } = req.body;
  const foundUser = await User.findOne({ _id: userData._id });
  if (!foundUser) {
    return res.status(404).json({
      message: "User with the provided user id is not found ....",
    });
  }

  if (foundUser.role === "admin") {
    const AllBookingList = await Booking.find();
    res.json({ bookingsList: AllBookingList });
  } else {
    const BookingOfOnePerson = await Booking.find({ userId: userData._id });
    res.json({
      bookingsList: BookingOfOnePerson,
    });
  }
});
export default router;
