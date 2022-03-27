const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const NoteSchema = new Schema({
  date: {
    type: Date,
    required: true,
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
});

module.exports = Note = mongoose.model("note", NoteSchema);
