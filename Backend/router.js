const express = require('express');
const router = express.Router();



router.put('/:id', (req, res) => {
    const noteId = req.params.id;
    const updateData = req.body;
    console.log(`Updating note with ID ${noteId}:`, updateData);
    res.send('Note updated successfully');
});

module.exports = router;
