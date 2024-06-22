const express = require("express");
const router = express.Router();
const NoteModel = require("./Model/NoteSchema");
const NoteSchema = require("./Model/NoteValidation");

router.get("/", async (req, res) => {
  try {
    const content = await NoteModel.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
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
 
router.post("/post", async (req, res) => {
  try {
    const newNote = await NoteModel.create(req.body); // Use create instead of insertMany for a single document
    res.status(201).json(newNote);
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: err.message });
  }
});


router.put("/update/:id", async (req, res) => {
  const noteId = req.params.id;
  const updateDataFromBody = req.body;


  try {
    const updatedNote = await NoteModel.findByIdAndUpdate(noteId, updateDataFromBody, { new: true });
    if (!updatedNote) {
      return res.status(404).send("Note is unavailable");
    }
    res.send(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/delete/:id",async (req,res)=>{
  const noteId = req.params.id;
  try{
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    if(!deletedNote){
      return res.status(404).send("Note is unavailable");
    }
    res.send(deletedNote);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;
