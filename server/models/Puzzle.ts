import mongoose from "mongoose";
import { TPuzzleRankings } from "../../shared/types";

const PuzzleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    date: {
        type: Date,
        required: true
    },
    centerLetter: {
        type: String,
        required: true
    },
    letters: {
        type: [String],
        required: true
    },
    pangrams: {
        type: [String],
        required: true
    },
    words: {
        type: [String],
        required: true
    },
    rankings: {
        type: [] as TPuzzleRankings,
        required: true
    }
});

const Puzzle = mongoose.model("Puzzle", PuzzleSchema);

export { Puzzle };