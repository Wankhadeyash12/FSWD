import React from 'react';
import NoteCard from './NoteCard';
import './NoteList.css';

function NoteList({ notes, onDelete, onUpdate }) {
  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default NoteList;
