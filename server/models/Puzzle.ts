const mongoose = require('mongoose');

const PuzzleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        auto: true,
    },
    date: Date,
    centerLetter: String,
    letters: [String],
    pangrams: [String],
    words: [String],
});

const Puzzle = mongoose.model("Puzzle", PuzzleSchema);

module.exports = Puzzle;