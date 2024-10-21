import Guest from "../Models/Guest.js";

export const addGuest = async (req, res) => {
  const { name, travelOption } = req.body;

  if (!name || !travelOption) {
    return res
      .status(400)
      .json({ error: "Name und Reiseoption sind erforderlich." });
  }

  try {
    const newGuest = new Guest({ name, travelOption });
    await newGuest.save();
    res.status(201).json(newGuest); // Return the new guest
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fehler beim Hinzufügen des Gastes" });
  }
};

export const allGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Gästeliste." });
  }
};

export const deleteGuestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Guest.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Gast nicht gefunden." });
    }
    res.status(200).send({ message: "Gast erfolgreich gelöscht." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Serverfehler." });
  }
};
