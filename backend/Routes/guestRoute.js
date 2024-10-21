import express from "express";
import {
  addGuest,
  allGuests,
  deleteGuestById,
} from "../Controllers/GuestController.js";

const router = express.Router();

// POST route to add a guest
router.post("/addGuest", addGuest);

// GET route to fetch all guests
router.get("/allGuests", allGuests);

// Delete guest
router.delete("/deleteGuestById/:id", deleteGuestById);

export default router;
