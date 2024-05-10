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
        default: []
    },
    noteSystem: {
        type: String,
        enum: ['Plain Text', 'Markdown', 'Rich Text'],
        default: 'Plain Text'
    },
    timestamps: true
});

const NoteModel = mongoose.model('Note', noteSchema);

module.exports = NoteModel;
