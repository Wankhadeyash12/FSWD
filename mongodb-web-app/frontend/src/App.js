import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // Add a new note
  const handleAddNote = async (newNote) => {
    try {
      const response = await axios.post('/api/notes', newNote);
      setNotes([response.data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  // Update a note
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(`/api/notes/${id}`, updatedNote);
      setNotes(notes.map(note => note._id === id ? response.data : note));
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note');
    }
  };

  // Filter notes
  const getFilteredNotes = () => {
    switch (filter) {
      case 'completed':
        return notes.filter(note => note.isCompleted);
      case 'pending':
        return notes.filter(note => !note.isCompleted);
      default:
        return notes;
    }
  };

  const filteredNotes = getFilteredNotes();

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 MongoDB Notes Manager</h1>
        <p>Store your notes in the cloud with MongoDB</p>
      </header>

      <main className="app-container">
        <div className="sidebar">
          <NoteForm onAddNote={handleAddNote} />
        </div>

        <div className="content">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({notes.length})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({notes.filter(n => n.isCompleted).length})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({notes.filter(n => !n.isCompleted).length})
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <p>No notes found. Create your first note!</p>
            </div>
          ) : (
            <NoteList
              notes={filteredNotes}
              onDelete={handleDeleteNote}
              onUpdate={handleUpdateNote}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
