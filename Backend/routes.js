const express = require("express");
const multer = require("multer");
const router = express.Router();
const NoteModel = require("./Model/NoteSchema");
const auth = require('./middleware/auth');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Uploads folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// Multer upload configuration
const upload = multer({ storage });

// GET all notes
router.get("/", auth, async (req, res) => {
  try {
    // Use req.user.userId to fetch notes
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

// POST a new note with image upload
router.post("/post", auth, upload.single('image'), async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const newNote = new NoteModel({
      title: req.body.title,
      content: req.body.content,
      image,
      userId: req.user.userId  // Ensure userId is correctly assigned
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT update a note by ID
router.put("/update/:id", auth, upload.single('image'), async (req, res) => {
  const noteId = req.params.id;
  const updateDataFromBody = req.body;

  if (req.file) {
    updateDataFromBody.image = `/uploads/${req.file.filename}`; // Update image path if uploaded
  }

  try {
    // Make sure the note is updated by the correct user
    const updatedNote = await NoteModel.findOneAndUpdate({ _id: noteId, userId: req.user.userId }, updateDataFromBody, { new: true });
    if (!updatedNote) {
      return res.status(404).send("Note is unavailable or you don't have permission to update it.");
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
    // Ensure the user is deleting their own note
    const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId, userId: req.user.userId });
    if (!deletedNote) {
      return res.status(404).send("Note is unavailable or you don't have permission to delete it.");
    }
    res.send(deletedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for uploading a file without creating a note
router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  res.send('File uploaded successfully');
});

module.exports = router;
