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

// ROUTE 2:  Add a new Note using : POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    // Adding validations for the fields using express-validator
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
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

// ROUTE 3:  Update an existing Note using : PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a newnote Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    //   Allow to update only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Interal Server Error");
  }
});

// ROUTE 4:  Delete an existing Note using : DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not Found");
    }

    //   Allow to delete only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Interal Server Error");
  }
});

module.exports = router;
