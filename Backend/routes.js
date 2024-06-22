const express = require("express");
const router = express.Router();
const NoteModel = require("./Model/NoteSchema");
const auth = require('./middleware/auth');

// GET all notes
router.get("/", auth, async (req, res) => {
  try {
    const content = await NoteModel.find({ userId: req.user.userId });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single note by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const content = await NoteModel.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/post', auth, async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const newNote = new NoteModel({
      title: req.body.title,
      content: req.body.content,
      image,
      userId: req.user.userId
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT update a note by ID
router.put('/update/:id', auth, async (req, res) => {
  const noteId = req.params.id;
  const updateDataFromBody = req.body;

  try {
    const updatedNote = await NoteModel.findOneAndUpdate({ _id: noteId, userId: req.user.userId }, updateDataFromBody, { new: true });
    if (!updatedNote) {
      return res.status(404).send('Note is unavailable');
    }
    res.send(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE a note by ID
router.delete("/delete/:id", auth, async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).send("Note is unavailable");
    }
    res.send(deletedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
