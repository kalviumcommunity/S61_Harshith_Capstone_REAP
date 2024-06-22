const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
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
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

});

const NoteModel = mongoose.model('Notes', noteSchema);

module.exports = NoteModel;
