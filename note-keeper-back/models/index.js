var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    priority: {
        type: Number,
        required: true,
        unique: false,
        default: 0
    },
    done: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    }
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
