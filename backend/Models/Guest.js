import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define a schema and model for guest names
const guestSchema = new Schema({
  name: { type: String, required: true },
  travelOption: { type: String, required: true },
});

const Guest = model("guest", guestSchema);
export default Guest;
