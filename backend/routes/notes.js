const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");

// ROUTE 1:  Get All the Notes using : GET "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    s;
    res.status(500).send("Interal Server Error");
  }
});

// ROUTE 1:  Add a new Note using : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    // Adding validations for the fields using express-validator
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors return Bad Request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   Creating a new note using Note Schema
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interal Server Error");
    }
  }
);

module.exports = router;
