const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

//Create Schema
const NoteSchema = new Schema({
  date: {
    type: Date,
    required: false,
  },
  subjective: {
    type: String,
    required: false,
  },
  objective: {
    type: String,
    required: false,
  },
  assessment: {
    type: String,
    required: false,
  },
  plan: {
    type: String,
    required: false,
  },
  finalizedDate: {
    type: Date,
    default: Date.now,
  },
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
});

/* module.exports = Note = mongoose.model("note", NoteSchema); */
module.exports = NoteSchema;
