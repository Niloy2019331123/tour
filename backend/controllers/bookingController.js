import { parse } from "dotenv";
import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: "internal server error" });
  }
};

//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "successful",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "not found" });
  }
};
//getBooking();
//get all booking
export const getAllBooking = async (req, res) => {
  //const email = req.body.email;
  //console.log(email);
  const id = req.query.userId;
  console.log(id);

  try {
    //await fetch(`${BASE_URL}/review/${id}`
    const books = await fetch(`localhost:4000/api/v1/booking?userId=id`, {
      method: "post",
    });
    res.status(200).json({
      success: true,
      message: "more successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error!" });
  }
};

/*
app.get("/search", (req, res) => {
  const emailToSearch = req.query.userEmail; // Get email from query parameter

  const foundBooking = Booking.find(
    (booking) => booking.email === emailToSearch
  );

  if (foundBooking) {
    res.json(foundBooking); // Respond with the found booking
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});

*/
/*
app.get("localhost:4000/api/v1/bookings/", (req, res) => {
  const emailToSearch = req.query.userEmail; // Get email from query parameter
  console.log(emailToSearch);
  // Call your search function here
  const foundBooking = searchBookingByEmail(emailToSearch);

  if (foundBooking) {
    res.json(foundBooking); // Respond with the found booking
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
});
*/
