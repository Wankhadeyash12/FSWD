import React, { useState } from 'react';
import './NoteCard.css';

function NoteCard({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleToggleComplete = () => {
    onUpdate(note._id, { ...note, isCompleted: !note.isCompleted });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedNote.title.trim() && editedNote.content.trim()) {
      onUpdate(note._id, editedNote);
      setIsEditing(false);
    } else {
      alert('Title and content cannot be empty');
    }
  };

  const handleCancel = () => {
    setEditedNote(note);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#ff6b6b';
      case 'Medium':
        return '#ffa85c';
      case 'Low':
        return '#51cf66';
      default:
        return '#999';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="note-card editing">
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            className="edit-input"
            maxLength="100"
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            className="edit-textarea"
            maxLength="5000"
          />
          <select
            name="category"
            value={editedNote.category}
            onChange={handleChange}
            className="edit-select"
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
          </select>
          <select
            name="priority"
            value={editedNote.priority}
            onChange={handleChange}
            className="edit-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div className="edit-buttons">
            <button onClick={handleSave} className="btn btn-save">Save</button>
            <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-card ${note.isCompleted ? 'completed' : ''}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={note.isCompleted}
            onChange={handleToggleComplete}
          />
          <span className="checkmark"></span>
        </label>
      </div>

      <div className="note-meta">
        <span className="category-badge">{note.category}</span>
        <span
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(note.priority) }}
        >
          {note.priority}
        </span>
      </div>

      <p className="note-content">{note.content}</p>

      <div className="note-footer">
        <small className="note-date">{formatDate(note.createdAt)}</small>
        <div className="note-actions">
          <button onClick={handleEdit} className="btn-icon btn-edit" title="Edit">✏️</button>
          <button onClick={() => onDelete(note._id)} className="btn-icon btn-delete" title="Delete">🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
