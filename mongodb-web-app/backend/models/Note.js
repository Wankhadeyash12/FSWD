const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000
    },
    category: {
      type: String,
      default: 'General',
      enum: ['General', 'Work', 'Personal', 'Ideas']
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      default: 'Medium',
      enum: ['Low', 'Medium', 'High']
    }
  },
  {
    timestamps: true
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
