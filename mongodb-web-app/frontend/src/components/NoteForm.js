import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm({ onAddNote }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onAddNote(formData);

    setFormData({
      title: '',
      content: '',
      category: 'General',
      priority: 'Medium'
    });
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Add New Note</h2>

      <input
        type="text"
        name="title"
        placeholder="Note Title"
        value={formData.title}
        onChange={handleChange}
        className="form-input"
        maxLength="100"
      />

      <textarea
        name="content"
        placeholder="Write your note here..."
        value={formData.content}
        onChange={handleChange}
        className="form-textarea"
        rows="6"
        maxLength="5000"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="form-select"
      >
        <option value="General">General</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Ideas">Ideas</option>
      </select>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="form-select"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button type="submit" className="submit-btn">Add Note</button>
    </form>
  );
}

export default NoteForm;
