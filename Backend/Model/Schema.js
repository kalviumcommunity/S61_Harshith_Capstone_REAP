const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;
