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

router.post("/post", async (req, res) => {
  try {
    const content = await NoteModel.insertMany(req.body);
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/update/:id", async (req, res) => {
  const noteId = req.params.id;
  const updateDataFromBody = req.body;

  const { error } = NoteSchema.validate(updateDataFromBody);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

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
