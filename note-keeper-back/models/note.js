var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    notes: [{
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
            unique: false,
            default: 0
        },
        done: {
            type: Boolean,
            unique: false,
            default: false
        },
    }]
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
